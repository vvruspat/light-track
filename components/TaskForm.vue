<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

type TaskFormProps = {
  title?: string;
  description?: string;
  estimation?: number;
  assignee?: string;
  status?: string;
};

const { title, description, estimation, assignee, status } =
  defineProps<TaskFormProps>();
const { taskId, storyId, epicId, projectId } = useRoute().params;

const schema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  assignee: z.string().optional(),
  estimation: z.number().optional(),
  status: z.string(),
});

const users = [
  {
    name: "Ivan Petrov",
    value: "2134253452345",
    url: "https://picsum.photos/600/800?random=1",
  },
  {
    name: "John Doe",
    value: "32452345",
    url: "https://picsum.photos/600/800?random=2",
  },
  {
    name: "Jane Doe",
    value: "34534765475",
    url: "https://picsum.photos/600/800?random=3",
  },
  {
    name: "Alice",
    value: "346346766547",
    url: "https://picsum.photos/600/800?random=4",
  },
  {
    name: "Bob",
    value: "34565433334",
    url: "https://picsum.photos/600/800?random=5",
  },
];

const statuses = [
  { name: "To Do", value: "todo", color: "gray" },
  { name: "In Progress", value: "in-progress", color: "yellow" },
  { name: "Done", value: "done", color: "green" },
  { name: "Rejected", value: "rejected", color: "red" },
];

type Schema = z.output<typeof schema>;

const state = reactive({
  title: title ?? "Untitled Epic",
  description: description ?? "",
  estimation: estimation ?? 0,
  assignee: assignee ?? "",
  status: status ?? "todo",
});

const assigneeSelected = ref<(typeof users)[number]>(
  users.find((user) => user.value === state.assignee) ?? users[0]
);
const statusSelected = ref<(typeof statuses)[number]>(
  statuses.find((status) => status.value === state.status) ?? statuses[0]
);

watch(
  () => assigneeSelected.value,
  (value) => {
    state.assignee = value.value;
  }
);

watch(
  () => statusSelected.value,
  (value) => {
    state.status = value.value;
  }
);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
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

    <UFormGroup label="Description" name="description">
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
          <Stack spacing="2">
            <UAvatar size="2xs" :src="user.url" alt="Avatar" />
            <span class="truncate">{{ user.name }}</span>
          </Stack>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UFormGroup label="Status" name="status">
      <USelectMenu
        v-model="statusSelected"
        :options="statuses"
        option-attribute="name"
      >
        <template #option="{ option: status }">
          <span
            class="h-2 w-2 rounded-full"
            :class="`bg-${status.color}-500 dark:bg-${status.color}-400`"
          />
          <span class="truncate">{{ status.name }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>

    <input v-if="taskId" type="hidden" name="taskId" :value="taskId" />
    <input type="hidden" name="storyId" :value="storyId" />

    <Stack direction="row" spacing="4">
      <UButton type="submit">
        <span v-if="epicId">Update task</span>
        <span v-else>Create task</span>
      </UButton>

      <UButton
        v-if="epicId"
        variant="ghost"
        :to="`/project/${projectId}/epic/${epicId}`"
      >
        Cancel
      </UButton>
      <UButton v-else variant="ghost" :to="`/project/${projectId}/epic`">
        Cancel
      </UButton>
    </Stack>
  </UForm>
</template>
