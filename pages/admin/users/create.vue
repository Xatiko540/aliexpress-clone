<template>
  <AdminLayout>
    <div class="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div>
              <CardTitle>Create User</CardTitle>
              <CardDescription>Add a new user to the system</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Avatar Upload -->
            <div class="flex items-center gap-4">
              <UiAvatar class="w-24 h-24">
                <UiAvatarImage :src="previewUrl || ''" />
                <UiAvatarFallback>
                  {{ username?.charAt(0)?.toUpperCase() || "U" }}
                </UiAvatarFallback>
              </UiAvatar>
              <Input
                ref="fileInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                @input="handleFileInput"
              />
            </div>

            <!-- Username -->
            <div class="space-y-2">
              <Label for="username">Username</Label>
              <Input id="username" v-model="username" placeholder="johndoe" />
              <span v-if="usernameError" class="text-sm text-destructive">{{ usernameError }}</span>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="john@example.com" />
              <span v-if="emailError" class="text-sm text-destructive">{{ emailError }}</span>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <Label for="password">Password</Label>
              <Input id="password" v-model="password" type="password" placeholder="••••••••" />
              <span v-if="passwordError" class="text-sm text-destructive">{{ passwordError }}</span>
            </div>

            <!-- Role -->
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
              <span v-if="roleError" class="text-sm text-destructive">{{ roleError }}</span>
            </div>

            <!-- Submit -->
            <Button type="submit" class="w-full" :disabled="isLoading">
              {{ isLoading ? "Creating..." : "Create User" }}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </AdminLayout>
</template>


<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/AppToast/use-toast";
import AdminLayout from "@/layouts/admin.vue";
import { z, ZodType } from "zod";
import { useField, useForm } from "vee-validate";
import { UiAvatar, UiAvatarImage, UiAvatarFallback } from "@/components/ui/avatar";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";

// Define schema and inferred type
const rawSchema = z.object({
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, _"),
  email: z.string().email().max(255),
  password: z.string().min(6).max(32),
  role: z.enum(["ADMIN", "USER"]), // ← Исправлено
});
type Schema = z.infer<typeof rawSchema>;

const router = useRouter();
const { toast } = useToast();

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const avatarFile = ref<File | null>(null);
const isLoading = ref(false);

const { handleSubmit, setFieldValue, errors } = useForm<Schema>({
  validationSchema: rawSchema,
  initialValues: {
    username: '',
    email: '',
    password: '',
    role: 'USER',
  },
});

const {
  value: username,
  errorMessage: usernameError,
} = useField<string>("username");
const {
  value: email,
  errorMessage: emailError,
} = useField<string>("email");
const {
  value: password,
  errorMessage: passwordError,
} = useField<string>("password");
const {
  value: role,
  errorMessage: roleError,
} = useField<"ADMIN" | "USER">("role");

onMounted(() => {
  setFieldValue("role", "USER");
});

const handleFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    toast({
      title: "Ошибка",
      description: "Файл больше 2MB",
      variant: "destructive",
    });
    return;
  }

  avatarFile.value = file;
  previewUrl.value = URL.createObjectURL(file);
};

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;

    const payload = {
      username: values.username.trim(),
      email: values.email.toLowerCase().trim(),
      password: values.password,
      role: values.role.toUpperCase() as "ADMIN" | "USER",
    };

    console.log("📤 Sending payload:", payload);

    const response = await $fetch("/api/users", {
      method: "POST",
      body: payload,
   
    });

    if (avatarFile.value) {
      const formData = new FormData();
      formData.append("avatar", avatarFile.value);

      await $fetch(`/api/users/avatar/${response.id}`, {
        method: "POST",
        body: formData,
      });
    }

    toast({ title: "✅ Успех", description: "Пользователь создан" });
    router.push("/admin/users");
  } catch (error: any) {
    console.error("❌ Submit error:", error);
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: error?.data?.message || error.message || "Ошибка создания",
    });
  } finally {
    isLoading.value = false;
  }
});

</script>
