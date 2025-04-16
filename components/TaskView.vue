<script setup lang="ts">
import { statuses } from "@/constants/statuses";
import calculateNumberOfLines from "@/utils/getLinesNumber";

const route = useRoute();
const taskId = Number(route.params.taskId);
const taskStore = useTasksStore();
const usersStore = useUsersStore();

const { currentChatUsers } = storeToRefs(usersStore);

const task = taskStore.currentProjectTasks.find((task) => task.id === taskId);

const titleEditMode = ref(false);
const descriptionEditMode = ref(false);
const descriptionLines = ref(5);

const users = computed(
  () =>
    currentChatUsers.value?.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      value: user.id,
      url: user.photo_url,
    })) ?? [],
);

const state = reactive({
  title: task?.title || "Untitled Task",
  description: task?.description || "No description",
  estimation: task?.estimation ?? 8,
  assignee: task?.assignee_id,
  status: task?.status ?? "todo",
});

const assigneeSelected = ref<(typeof users.value)[number] | undefined>(
  users.value[0],
);

watch(users, () => {
  assigneeSelected.value =
    users.value.find((user) => user.value === state.assignee) ?? users.value[0];
});

const statusSelected = ref<(typeof statuses)[number]>(
  statuses.find((statusItem) => statusItem.value === state.status) ??
    statuses[0],
);

function updateTask() {
  taskStore.updateTask(
    taskId,
    state.title,
    state.description,
    state.estimation,
    state.assignee,
    state.status,
  );
}

const debouncedUpdateTask = useDebounce(updateTask, 500);

function onTitleBlur() {
  titleEditMode.value = false;
}

function onDescriptionClick(event: MouseEvent) {
  const linesNumber = calculateNumberOfLines(event.target as HTMLElement);

  if (linesNumber > 5) {
    descriptionLines.value = linesNumber;
  } else {
    descriptionLines.value = 5;
  }

  descriptionEditMode.value = true;
}

function onDescriptionKewdown(event: KeyboardEvent) {
  if (
    event.key === "Enter" &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey &&
    !event.metaKey
  ) {
    descriptionEditMode.value = false;
  }
}

function onDescriptionBlur() {
  descriptionEditMode.value = false;
}

function onEstimationFocus(event: FocusEvent) {
  (event.target as HTMLInputElement).select();
}

function onTitleFocus(event: FocusEvent) {
  (event.target as HTMLInputElement).select();
}

function onDescriptionFocus(event: FocusEvent) {
  (event.target as HTMLInputElement).select();
}

watch(
  () => assigneeSelected.value,
  (value) => {
    state.assignee = value?.value;
  },
);

watch(
  () => statusSelected.value,
  (value) => {
    state.status = value.value;
  },
);

watch(state, () => {
  debouncedUpdateTask();
});

await usersStore.fetchUsers();
</script>

<template>
  <StackContainer
    spacing="4"
    align-items="start"
    justify="stretch"
    class="flex-col md:flex-row"
  >
    <StackContainer
      direction="column"
      spacing="4"
      align-items="stretch"
      justify="start"
      class="grow-1 w-full"
    >
      <Teleport to="#tabbar-header-title" :defer="true">
        <div>
          <UInput
            v-if="titleEditMode"
            v-model="state.title"
            autofocus
            variant="none"
            :padded="false"
            size="xl"
            class="bg-gray-200 dark:bg-gray-800"
            @focus="onTitleFocus"
            @blur="onTitleBlur"
            @keydown.enter="onTitleBlur"
          />
          <div v-else @click="titleEditMode = true">
            {{ state.title }}
          </div>
        </div>
      </Teleport>

      <UTextarea
        v-if="descriptionEditMode"
        v-model="state.description"
        autoresize
        autofocus
        variant="none"
        size="lg"
        :padded="false"
        :rows="descriptionLines"
        class="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 relative block w-full"
        @focus="onDescriptionFocus"
        @blur="onDescriptionBlur"
        @keydown="onDescriptionKewdown"
      />

      <div
        v-else
        v-linkify:options="{
          target: '_blank',
          className: (href: string, type: string) => {
            if (type === 'url') {
              return 'text-blue-500 dark:text-blue-400 hover:underline';
            }
            return 'text-blue-500 dark:text-blue-400 underline';
          },
          attributes: {
            onclick: 'event.stopPropagation()',
          },
        }"
        class="relative block w-full text-sm px-0 text-gray-900 dark:text-gray-200 whitespace-pre-wrap"
        @click="onDescriptionClick"
      >
        {{ state.description }}
      </div>
    </StackContainer>

    <UCard class="bg-gray-200 dark:bg-gray-800 w-full md:w-auto">
      <StackContainer direction="column" spacing="4" align-items="stretch">
        <UFormGroup label="Status" name="status">
          <USelectMenu
            v-if="statuses.length"
            v-model="statusSelected"
            :options="statuses"
            option-attribute="name"
          >
            <template #leading>
              <span
                class="h-4 w-4 rounded-full"
                :class="`bg-${statusSelected.color}-500 dark:bg-${statusSelected.color}-400`"
              />
            </template>
            <template #option="{ option }">
              <span
                class="h-2 w-2 rounded-full"
                :class="`bg-${option.color}-500 dark:bg-${option.color}-400`"
              />
              <span class="truncate">{{ option.name }}</span>
            </template>
          </USelectMenu>
          <USkeleton v-else class="h-8 w-full" />
        </UFormGroup>

        <UFormGroup label="Assignee" name="assignee">
          <USelectMenu
            v-if="users.length > 0"
            v-model="assigneeSelected"
            :options="users"
            option-attribute="name"
            placeholder="Select a person"
            searchable
            searchable-placeholder="Search by name or id"
            :search-attributes="['name', 'value']"
          >
            <template #leading>
              <UAvatar
                v-if="assigneeSelected?.url"
                size="2xs"
                :src="assigneeSelected.url"
                alt="Avatar"
              />
            </template>
            <template #option="{ option: user }">
              <StackContainer spacing="2">
                <UAvatar size="2xs" :src="user.url" alt="Avatar" />
                <span class="truncate">{{ user.name }}</span>
              </StackContainer>
            </template>
          </USelectMenu>
          <USkeleton v-else class="h-8 w-full" />
        </UFormGroup>

        <UFormGroup label="Estimation" name="estimation">
          <UInput
            v-model="state.estimation"
            type="number"
            @focus="onEstimationFocus"
          />
        </UFormGroup>
      </StackContainer>
    </UCard>
  </StackContainer>
</template>
