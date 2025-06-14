<template>
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
          <!-- UiAvatar Upload -->
          <div class="flex items-center gap-4">
            <UiAvatar class="w-24 h-24">
              <UiAvatarImage :src="previewUrl || ''" />
              <UiAvatarFallback>
                {{ (username as Ref<string>).value?.charAt(0)?.toUpperCase() || "U" }}
              </UiAvatarFallback>
            </UiAvatar>
            <Input
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              @input="handleFileInput"
            />
          </div>

          <!-- Username field -->
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
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
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
            {{ isLoading ? "Creating..." : "Create User" }}
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>


<script setup lang="ts">
import { useToast } from "@/components/ui/AppToast/use-toast";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { ArrowLeft, UserPlus } from "lucide-vue-next";
import { UiAvatar, UiAvatarImage, UiAvatarFallback } from "@/components/ui/avatar";



const router = useRouter();
const { toast } = useToast();
const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string | null>(null);
const avatarFile = ref<File | null>(null);

const validationSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(3, "Минимум 3 символа")
      .max(50)
      .regex(/^[a-zA-Z0-9_]+$/, "Только буквы, цифры и _"),
    email: z.string().email("Неверный email").max(255),
    password: z.string().min(6).max(32),
    role: z.string().min(1, "Обязательное поле"),
  })
);

const { handleSubmit } = useForm({ validationSchema });

const { value: username, errorMessage: usernameError } = useField("username");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: role, errorMessage: roleError } = useField("role", undefined, {
  initialValue: "user",
});

const isLoading = ref(false);

const handleFileInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла > 2MB",
        variant: "destructive",
      });
      return;
    }
    avatarFile.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
};

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await $fetch("/api/users", {
      method: "POST",
      body: {
        username: values.username.trim(),
        email: values.email.toLowerCase().trim(),
        password: values.password,
        role: values.role,
      },
    });

    if (avatarFile.value) {
      const formData = new FormData();
      formData.append("avatar", avatarFile.value);
      await $fetch(`/api/users/avatar/${response.id}`, {
        method: "POST",
        body: formData,
      });
    }

    toast({ title: "Успех", description: "Пользователь создан" });
    router.push("/admin/users");
  } catch (error: any) {
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