<template>
  <AdminLayout>
    <div>
      <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div>
          <h1 class="text-3xl font-bold">Редактировать пользователя</h1>
          <p class="text-gray-500">Обновление данных участника</p>
        </div>
        <NuxtLink to="/admin/users">
          <Button variant="outline">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Назад
          </Button>
        </NuxtLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Данные участника</CardTitle>
          <CardDescription>Измените информацию о пользователе</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Avatar Upload -->
            <div class="space-y-2">
              <Label>Аватар</Label>
              <div class="flex items-center gap-4 flex-wrap">
                <Avatar class="w-24 h-24">
                  <AvatarImage :src="avatarSrc as string" :alt="user?.username" />
                  <AvatarFallback>
                    {{ user?.username?.charAt(0).toUpperCase() }}
                  </AvatarFallback>
                </Avatar>
                <Input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  @input="handleFileInput"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="username">Имя пользователя</Label>
              <Input id="username" v-model="username" placeholder="johndoe" />
              <span v-if="usernameError" class="text-sm text-destructive">
                {{ usernameError }}
              </span>
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
            <Input
                id="email"
                v-model="email"
                type="email"
                :placeholder="user?.email"
                readonly
              />
              <span class="text-gray-700">{{ email }}</span>
              <span v-if="emailError" class="text-sm text-destructive">
                {{ emailError }}
              </span>
            </div>

            <div class="space-y-2">
              <Label for="password">Новый пароль (необязательно)</Label>
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="Оставьте пустым, чтобы не менять"
              />
              <span v-if="passwordError" class="text-sm text-destructive">
                {{ passwordError }}
              </span>
            </div>

            <div class="space-y-2">
              <Label for="role">Роль</Label>
                <Select v-model="role">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <span v-if="roleError" class="text-sm text-destructive">
                {{ roleError }}
              </span>
            </div>

              <Button type="submit" class="w-full" :disabled="isLoading || !isModified">
            {{ isLoading ? "Сохраняем..." : "Сохранить" }}
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
</template>

 <script setup lang="ts">
import { useToast } from "@/components/ui/AppToast/use-toast";
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft } from "lucide-vue-next";
import Avatar from "@/components/ui/avatar/Avatar.vue";
import AvatarImage from "@/components/ui/avatar/AvatarImage.vue";
import AvatarFallback from "@/components/ui/avatar/AvatarFallback.vue";
import AdminLayout from "@/layouts/admin.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";

// ⚙️ State
const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const isLoading = ref(false);
const isDirty = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const avatarFile = ref<File | null>(null);

// ⚙️ API fetch
type User = { id: string; email: string; username?: string; role?: string; avatar?: string; createdAt: string };
const { data: user } = await useFetch<User>(`/api/users/${route.params.id}`, {
  default: () => ({ id: '', email: '', username: '', role: 'admin', avatar: '', createdAt: '' }),
});
if (!user.value) throw createError({ statusCode: 404, message: "User not found" });

// ⚙️ Form Setup
const validRoles = ["user", "admin"] as const;
type Role = (typeof validRoles)[number];

const validationSchema = toTypedSchema(
  z.object({
    username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email().max(255),
    password: z.string().min(6).max(32).optional().or(z.literal("")),
    role: z.enum(["user", "admin"]),
  })
);

const {
  handleSubmit,
  setFieldValue,
} = useForm({
  validationSchema,
  initialValues: {
    username: user.value.username || "noname",
    email: user.value.email,
    password: "",
    role: validRoles.includes(user.value.role as Role) ? (user.value.role as Role) : "admin",
  },
});

const { value: username, errorMessage: usernameError } = useField<string>("username");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const { value: role, errorMessage: roleError } = useField<string>("role");

// 🔄 Watch form state
watch([username, email, password, role], () => {
  isDirty.value = true;
});

watchEffect(() => {
  console.log("Изменения в форме:", {
    username: username.value,
    email: email.value,
    role: role.value,
  });
});

const isModified = computed(() => {
  return (
    username.value !== user.value?.username ||
    role.value !== user.value?.role ||
    (password.value && password.value.length >= 6) ||
    avatarFile.value !== null
  );
});

// 🖼️ Avatar
const avatarSrc = computed(() =>
  previewUrl.value ? previewUrl.value : user.value?.avatar ? `/${user.value.avatar.replace(/^\//, "")}` : ""
);

const handleFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && file.size > 2 * 1024 * 1024) {
    toast({ title: "Ошибка", description: "Размер до 2MB", variant: "destructive" });
    return;
  }
  avatarFile.value = file || null;
  previewUrl.value = file ? URL.createObjectURL(file) : null;
};

// 🚀 Submit
const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;

      const updateData: any = {
        username: values.username.trim(), // ВСЕГДА включать
        email: values.email.toLowerCase(), // ВСЕГДА включать
        role: values.role.toUpperCase(),  // ВСЕГДА включать
      };

      if (values.password && values.password.length >= 6) {
        updateData.password = values.password;
      }

    console.log("📤 Отправка на сервер:", updateData);

    await $fetch(`/api/users/${route.params.id}`, {
      method: "PUT",
      body: updateData,
    });

    if (avatarFile.value) {
      const formData = new FormData();
      formData.append("avatar", avatarFile.value);
      await $fetch(`/api/users/avatar/${route.params.id}`, {
        method: "POST",
        body: formData,
      });
    }

    toast({ title: "✅ Успешно", description: "Пользователь обновлён" });
    router.push("/admin/users");

  } catch (error: any) {
    console.error("❌ Ошибка при обновлении:", error);
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: error?.data?.message || error.message || "Ошибка при обновлении",
    });
  } finally {
    isLoading.value = false;
  }
});
</script>