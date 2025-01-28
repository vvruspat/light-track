<script setup lang="ts">
import calculateNumberOfLines from "@/utils/getLinesNumber";

type TaskFormProps = {
  title?: string;
  description?: string;
  estimation?: number;
  assignee?: string;
  status?: string;
};

const { title, description, estimation, assignee, status } =
  defineProps<TaskFormProps>();

const titleEditMode = ref(false);
const descriptionEditMode = ref(false);
const descriptionLines = ref(5);

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

const state = reactive({
  title: title ?? "Untitled Task",
  description:
    description ??
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  estimation: estimation ?? 8,
  assignee: assignee ?? "",
  status: status ?? "todo",
});

const assigneeSelected = ref<(typeof users)[number]>(
  users.find((user) => user.value === state.assignee) ?? users[0],
);
const statusSelected = ref<(typeof statuses)[number]>(
  statuses.find((statusItem) => statusItem.value === state.status) ??
    statuses[0],
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

watch(state, () => {
  console.log("State changed", state);
  // TODO: call API to update task
});

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

function onDescriptionBlur() {
  descriptionEditMode.value = false;
}
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
        @blur="onDescriptionBlur"
        @keydown.enter="onDescriptionBlur"
      />
      <div
        v-else
        class="relative block w-full text-sm px-0 text-gray-900 dark:text-gray-200"
        @click="onDescriptionClick"
      >
        {{ state.description }}
      </div>
    </StackContainer>

    <UCard class="bg-gray-200 dark:bg-gray-800 w-full md:w-auto">
      <StackContainer direction="column" spacing="4" align-items="stretch">
        <UFormGroup label="Status" name="status">
          <USelectMenu
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
            <template #leading>
              <UAvatar size="2xs" :src="assigneeSelected.url" alt="Avatar" />
            </template>
            <template #option="{ option: user }">
              <StackContainer spacing="2">
                <UAvatar size="2xs" :src="user.url" alt="Avatar" />
                <span class="truncate">{{ user.name }}</span>
              </StackContainer>
            </template>
          </USelectMenu>
        </UFormGroup>

        <UFormGroup label="Estimation" name="estimation">
          <UInput v-model="state.estimation" type="number" />
        </UFormGroup>
      </StackContainer>
    </UCard>
  </StackContainer>
</template>
