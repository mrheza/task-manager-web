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
              <md-input v-model="form.title" />
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Description</label>
              <md-textarea v-model="form.description" />
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="title">Tag</label>
              <md-input v-model="form.tag" />
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button type="button" class="md-primary" @click="saveTask">
          Save
        </md-button>
        <md-button type="button" class="md-accent" @click="cancelInput">
          Cancel
        </md-button>
      </md-card-actions>
    </md-card>

    <md-button
      class="md-raised md-primary"
      @click="uploadData"
      :disabled="uploading"
    >
      Sync Data {{ countUnupload !== 0 ? `(${countUnupload})` : "" }}
    </md-button>

    <br />

    <md-progress-bar
      md-mode="indeterminate"
      v-show="progressBarStatus"
    ></md-progress-bar>
    <md-table v-model="task" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Task List</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item, index }">
        <md-table-cell md-label="No" md-numeric>{{ index + 1 }}</md-table-cell>
        <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Description">
          {{ item.description }}
        </md-table-cell>
        <md-table-cell md-label="Tag">{{ item.tag }}</md-table-cell>
        <md-table-cell md-label="Status">
          <md-content
            v-if="item.status === 1"
            class="md-primary"
            style="text-align: center"
            >Complete</md-content
          >
          <md-content v-else class="md-accent" style="text-align: center"
            >Incomplete</md-content
          >
        </md-table-cell>
        <md-table-cell md-label="Actions" class="align-center">
          <md-button
            @click="openUpdateStatusDialog(item._id)"
            class="md-icon-button"
            title="Update Status"
          >
            <md-icon>power_settings_new</md-icon>
          </md-button>
          <md-button
            @click="editTask(item._id)"
            class="md-icon-button"
            title="Edit Task"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            @click="openDeleteDialog(item._id)"
            class="md-icon-button"
            title="Delete Task"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-alert
      :md-active.sync="alertActive"
      :md-content="alertContent"
      md-confirm-text="OK"
    />

    <md-dialog-confirm
      :md-active.sync="confirmDeleteActive"
      md-title="Delete Data"
      :md-content="`Are you sure to delete <strong>${nameForDelete}</strong> ?`"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="cancelDelete"
      @md-confirm="deleteTask"
    />

    <md-dialog-confirm
      :md-active.sync="confirmStatusActive"
      md-title="Update Status"
      :md-content="
        `Are you sure to update <strong>${nameForUpdateStatus}</strong> to ${statusText}?`
      "
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="cancelUpdateStatus"
      @md-confirm="updateStatus"
    />
  </div>
</template>

<script>
import TodoLib from "@/lib/todo";
const todo = new TodoLib();

export default {
  name: "TaskManager",
  data: () => ({
    form: {
      title: "",
      description: "",
      tag: "",
      status: 0
    },
    taskId: null,
    alertActive: false,
    confirmDeleteActive: false,
    confirmStatusActive: false,
    alertContent: "",
    nameForDelete: "",
    nameForUpdateStatus: "",
    statusText: "",
    task: [],
    countUnupload: 0,
    uploading: false,
    progressBarStatus: false
  }),
  async mounted() {
    todo.setName("task_manager");
    await todo.initialize();
    this.task = todo.data;
    this.countUnupload = todo.countUnuploadeds();
  },
  methods: {
    openUpdateStatusDialog(id) {
      this.taskId = id;
      this.confirmStatusActive = true;
      const data = todo.filterDataById(id, this.task);
      this.nameForUpdateStatus = data[0].title;
      this.statusText = data[0].status === 0 ? "Complete" : "Incomplete";
      this.form = {
        title: data[0].title,
        description: data[0].description,
        tag: data[0].tag,
        status: data[0].status === 0 ? 1 : 0
      };
    },
    async updateStatus() {
      await todo.editItem(this.taskId, this.form);
      this.alertContent = "Task has been edited";
      this.task = todo.data;
      this.countUnupload = todo.countUnuploadeds();
      this.taskId = null;
      this.form = {
        title: "",
        description: "",
        tag: "",
        status: 0
      };
    },
    cancelUpdateStatus() {
      this.taskId = null;
      this.nameForUpdateStatus = "";
      this.statusText = "";
      this.form = {
        title: "",
        description: "",
        tag: "",
        status: 0
      };
    },
    editTask(id) {
      this.taskId = id;
      const editData = todo.filterDataById(id, this.task);
      this.form = {
        title: editData[0].title,
        description: editData[0].description,
        tag: editData[0].tag,
        status: editData[0].status
      };
    },
    openDeleteDialog(id) {
      this.taskId = id;
      this.confirmDeleteActive = true;
      const data = todo.filterDataById(id, this.task);
      this.nameForDelete = data[0].title;
    },
    async deleteTask() {
      todo.deleteItem(this.taskId);
      this.taskId = null;
      this.task = todo.data;
      this.countUnupload = todo.countUnuploadeds();
    },
    cancelDelete() {
      this.taskId = null;
      this.nameForDelete = "";
    },
    async saveTask() {
      if (this.form.title.trim() !== "") {
        if (this.taskId === null) {
          await todo.addItem(this.form);
          this.alertContent = "Task has been created";
        } else {
          await todo.editItem(this.taskId, this.form);
          this.alertContent = "Task has been edited";
        }
        this.task = todo.data;
        this.countUnupload = todo.countUnuploadeds();
        this.alertActive = true;
        this.taskId = null;
        this.form = {
          title: "",
          description: "",
          tag: "",
          status: 0
        };
      }
    },
    cancelInput() {
      this.taskId = null;
      this.form = {
        title: "",
        description: "",
        tag: "",
        status: 0
      };
    },
    async uploadData() {
      if (this.countUnupload !== 0) {
        this.uploading = true;
        this.progressBarStatus = true;
        try {
          await todo.upload();
          this.alertContent = "Upload data success";
        } catch (err) {
          this.alertContent = "Upload data failed";
          console.log(err.message);
        }
        this.alertActive = true;
        this.uploading = false;
        this.progressBarStatus = false;
        this.countUnupload = todo.countUnuploadeds();
      }
    }
  }
};
</script>
