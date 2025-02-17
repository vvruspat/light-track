<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { statuses } from "@/constants/statuses";

const { taskId, storyId, epicId, projectId } = useRoute().params;

const currentProjectStore = useCurrentProjectStore();
const tasksStore = useTasksStore();
const usersStore = useUsersStore();

const { currentChatUsers } = storeToRefs(usersStore);

const router = useRouter();

const task = computed(() => {
  if (taskId) {
    return currentProjectStore.currentProject?.epics
      .find((epic) => epic.id === Number(epicId))
      ?.stories.find((story) => story.id === Number(storyId))
      ?.tasks.find((task) => task.id === Number(taskId));
  }

  return null;
});

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  assignee: z.number().optional(),
  estimation: z.number().optional(),
  status: z.string(),
});

const users = computed(() =>
  currentChatUsers.value.map((user) => ({
    name: `${user.first_name} ${user.last_name}`,
    value: user.id,
    url: user.photo_url,
  })),
);

type Schema = z.output<typeof schema>;

const state = reactive({
  title: task.value?.title ?? "Untitled task",
  description: task.value?.description ?? "",
  estimation: task.value?.estimation ?? 0,
  assignee: task.value?.assignee_id,
  status: task.value?.status ?? "todo",
});

const assigneeSelected = ref<(typeof users.value)[number]>(
  users.value.find((user) => user.value === state.assignee) ?? users.value[0],
);
const statusSelected = ref<(typeof statuses)[number]>(
  statuses.find((status) => status.value === state.status) ?? statuses[0],
);

watch(
  () => assigneeSelected.value,
  (value) => {
    state.assignee = value.value;
  },
);

watch(
  () => statusSelected.value,
  (value) => {
    state.status = value.value;
  },
);

usersStore.fetchUsers();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (taskId) {
    await tasksStore.updateTask(
      Number(taskId),
      event.data.title,
      event.data.description ?? "",
      event.data.estimation,
      event.data.assignee,
      event.data.status,
    );
  } else {
    await tasksStore.createTask(
      Number(storyId),
      event.data.title,
      event.data.description ?? "",
      event.data.estimation,
      event.data.assignee,
      event.data.status,
    );
  }

  await currentProjectStore.getProjectById(Number(projectId), true);

  router.push(`/project/${projectId}/epic/${epicId}`);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea v-model="state.description" autoresize />
    </UFormGroup>

    <UFormGroup label="Estimation" name="description">
      <UInput v-model="state.estimation" type="number" />
    </UFormGroup>

    <UFormGroup label="Assignee" name="assignee">
      <USelectMenu
        v-model="assigneeSelected"
        :options="users"
        option-attribute="name"
        placeholder="Select a person"
        searchable
        searchable-placeholder="Search by name or id"
        :search-attributes="['name', 'value']"
      >
        <template #option="{ option: user }">
          <StackContainer spacing="2">
            <UAvatar size="2xs" :src="user.url" alt="Avatar" />
            <span class="truncate">{{ user.name }}</span>
          </StackContainer>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UFormGroup label="Status" name="status">
      <USelectMenu
        v-model="statusSelected"
        :options="statuses"
        option-attribute="name"
      >
        <template #option="{ option: opt }">
          <span
            class="h-2 w-2 rounded-full"
            :class="`bg-${opt.color}-500 dark:bg-${opt.color}-400`"
          />
          <span class="truncate">{{ opt.name }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UInput v-if="taskId" type="hidden" name="taskId" :value="taskId" />
    <UInput type="hidden" name="storyId" :value="storyId" />

    <StackContainer direction="row" spacing="4">
      <UButton type="submit">
        <span v-if="taskId">Update task</span>
        <span v-else>Create task</span>
      </UButton>

      <UButton
        variant="ghost"
        :to="`/project/${projectId}/epic/${epicId}`"
      >
        Cancel
      </UButton>
    </StackContainer>
  </UForm>
</template>
