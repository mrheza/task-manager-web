<template>
  <div style="padding: 20px">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Task</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Title</label>
              <md-input v-model="title" />
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Description</label>
              <md-textarea v-model="description" />
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Tag</label>
              <md-input v-model="tag" />
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button type="button" class="md-primary" @click="saveTask">
          Save
        </md-button>
      </md-card-actions>
    </md-card>

    <br />

    <md-table v-model="task" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Task List</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="No" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Description">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Tag">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Actions" class="align-center">
          <md-button @click="doneTask(item.id)" class="md-icon-button">
            <md-icon>done</md-icon>
          </md-button>
          <md-button @click="editTask(item.id)" class="md-icon-button">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button @click="deleteTask(item.id)" class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "TaskManager",
  data: () => ({
    taskId: null,
    title: null,
    description: null,
    tag: null,
    task: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner"
      }
    ]
  }),
  methods: {
    doneTask(id) {
      console.log(id);
    },
    editTask(id) {
      console.log(id);
    },
    deleteTask(id) {
      console.log(id);
    },
    saveTask() {
      console.log("save");
    }
  }
};
</script>
