<template>
    <AdminLayout>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Пользователи</h1>
        <p class="text-gray-500">Управление пользователями системы</p>
      </div>
      <NuxtLink to="/admin/users/create">
        <Button>
          <UserPlus class="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </NuxtLink>
    </div>

    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50 text-xs text-gray-500 uppercase whitespace-nowrap">
          <tr>
            <th class="px-4 py-3 text-left">Имя</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Роль</th>
            <th class="px-4 py-3 text-left">Баланс</th>
            <th class="px-4 py-3 text-left">Создан</th>
            <th class="px-4 py-3 text-left">Действия</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <td class="px-4 py-2 whitespace-nowrap">{{ user.username || '-' }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-ellipsis overflow-hidden">{{ user.email }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ user.role || 'user' }}</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ (user.balance / 100).toFixed(2) }} ₽</td>
            <td class="px-4 py-2 whitespace-nowrap">{{ new Date(user.createdAt).toLocaleDateString() }}</td>
            <td class="px-4 py-2 whitespace-nowrap">
              <DropdownMenu>
                <DropdownMenuTrigger as="Button" variant="ghost" size="icon">
                  <MoreHorizontal class="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @click="handleEdit(user.id)">
                    <Pencil class="w-4 h-4 mr-2" />Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    @click="handleDelete(user.id)"
                    class="text-destructive focus:text-destructive"
                  >
                    <Trash2 class="w-4 h-4 mr-2" />Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/AppToast/use-toast";
import { Pencil, Trash2, UserPlus, MoreHorizontal } from "lucide-vue-next";
import AdminLayout from '@/layouts/admin.vue'

const { toast } = useToast();
const router = useRouter();


type User = {
  id: string;
  email: string;
  username?: string;
  role?: string;
  avatar?: string;
  createdAt: string;
  balance: number;
};

const users = ref<User[]>([]);
const isLoading = ref(false);

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const data = await $fetch<User[]>("/api/users", { credentials: 'include' });
    users.value = data;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: error?.data?.message || error.message || "Не удалось загрузить пользователей",
    });
  } finally {
    isLoading.value = false;
  }
};

const handleEdit = (userId: string) => {
  router.push(`/admin/users/${userId}/edit`);
};

const handleDelete = async (id: string) => {
  try {
    await $fetch(`/api/users/${id}`, { method: "DELETE", credentials: 'include' });
    toast({
      title: "Успешно",
      description: "Пользователь удалён",
    });
    await fetchUsers();
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: error?.data?.message || error.message || "Не удалось удалить пользователя",
    });
  }
};

onMounted(fetchUsers);
</script>
