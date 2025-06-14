
<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold">Users</h1>
        <p class="text-muted-foreground">Manage system users</p>
      </div>
      <NuxtLink to="/admin/users/create">
        <Button>
          <UserPlus class="w-4 h-4 mr-2" />
          Create User
        </Button>
      </NuxtLink>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>List of all users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead class="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="user in users" :key="user.id">
              <TableCell>{{ user.username }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>{{ user.role }}</TableCell>
              <TableCell>{{
                new Date(user.createdAt).toLocaleDateString()
              }}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger as="Button" variant="ghost" size="icon">
                    <MoreHorizontal class="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem @click="handleEdit(user.id)">
                      <Pencil class="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      @click="handleDelete(user.id)"
                      class="text-destructive focus:text-destructive"
                    >
                      <Trash2 class="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>


<script setup lang="ts">
import { useToast } from "@/components/ui/AppToast/use-toast";
import { Pencil, Trash2, UserPlus, Eye, MoreHorizontal } from "lucide-vue-next";

// definePageMeta({
//   layout: "admin",
//   middleware: ["check-auth"],
// });

const { toast } = useToast();
const router = useRouter();

// Prisma-подобный тип User
type User = {
  id: string;
  email: string;
  username?: string;
  role?: string;
  avatar?: string;
  createdAt: string;
};

const users = ref<User[]>([]);
const isLoading = ref(false);

// Fetch users
const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const data = await $fetch<User[]>("/api/users");
    users.value = data;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error?.data?.message || error.message || "Failed to fetch users",
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
    await $fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    toast({
      title: "Success",
      description: "User berhasil dihapus",
    });
    await fetchUsers();
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error?.data?.message || error.message || "Failed to delete user",
    });
  }
};

onMounted(fetchUsers);



</script>


