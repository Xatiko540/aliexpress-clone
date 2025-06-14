<script setup lang="ts">
import { useToast } from "@/components/ui/AppToast/use-toast";
import { z } from "zod";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft } from "lucide-vue-next";


import Avatar from "@/components/ui/avatar/Avatar.vue";
import AvatarImage from "@/components/ui/avatar/AvatarImage.vue";
import AvatarFallback from "@/components/ui/avatar/AvatarFallback.vue";



// тип юзера как в Prisma, адаптирован
type User = {
  id: string;
  email: string;
  username?: string;
  role?: string;
  avatar?: string;
  createdAt: string;
};

const route = useRoute();
const router = useRouter();
const { toast } = useToast();
const isLoading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const avatarFile = ref<File | null>(null);

const { data: user } = await useFetch<User>(`/api/users/${route.params.id}`);

if (!user.value) {
  throw createError({ statusCode: 404, message: "User not found" });
}

// Форма
const validationSchema = toTypedSchema(
  z.object({
    username: z.string()
      .min(3, "Минимум 3 символа")
      .max(50)
      .regex(/^[a-zA-Z0-9_]+$/, "Допустимы буквы, цифры и _"),
    email: z.string().email().max(255),
    password: z.string().min(6).max(32).optional().or(z.literal("")),
    role: z.enum(["user", "admin"]),
  })
);

const validRoles = ["user", "admin"] as const;
type Role = (typeof validRoles)[number];

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: user.value.username || "",
    email: user.value.email,
    password: "",
    role: validRoles.includes(user.value.role as Role)
      ? (user.value.role as Role)
      : "admin", // 👈 по умолчанию админ
  },
});



const { value: username, errorMessage: usernameError } = useField<string>("username");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } = useField<string>("password");
const { value: role, errorMessage: roleError } = useField<string>("role");

const avatarSrc = computed(() =>
  previewUrl.value
    ? previewUrl.value
    : user.value?.avatar
    ? `/${user.value.avatar.replace(/^\//, "")}`
    : ""
);

const usernameInitial = computed(() =>
  (username.value?.charAt(0)?.toUpperCase()) || "U"
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

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;

    await $fetch(`/api/users/${route.params.id}`, {
      method: "PUT",
      body: {
        username: values.username.trim(),
        email: values.email.toLowerCase().trim(),
        role: values.role,
        ...(values.password ? { password: values.password } : {}),
      },
    });

    if (avatarFile.value) {
      const formData = new FormData();
      formData.append("avatar", avatarFile.value);
      await $fetch(`/api/users/avatar/${route.params.id}`, {
        method: "POST",
        body: formData,
      });
    }

    toast({ title: "Успешно", description: "Пользователь обновлён" });
    router.push("/admin/users");

  } catch (error: any) {
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

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Edit User</h1>
        <p class="text-muted-foreground">Update user information</p>
      </div>
      <NuxtLink to="/admin/users">
        <Button variant="outline">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to Users
        </Button>
      </NuxtLink>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>Update the user's details</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Avatar Upload -->
          <div class="space-y-2">
            <Label>Avatar</Label>
            <div class="flex items-center gap-4">
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
            <Label for="username">Username</Label>
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
              placeholder="john@example.com"
            />
            <span v-if="emailError" class="text-sm text-destructive">
              {{ emailError }}
            </span>
          </div>

          <div class="space-y-2">
            <Label for="password">Password (Optional)</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="Leave blank to keep current password"
            />
            <span v-if="passwordError" class="text-sm text-destructive">
              {{ passwordError }}
            </span>
          </div>

          <div class="space-y-2">
            <Label for="role">Role</Label>
            <Select v-model="role">
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
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

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? "Updating..." : "Update User" }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
