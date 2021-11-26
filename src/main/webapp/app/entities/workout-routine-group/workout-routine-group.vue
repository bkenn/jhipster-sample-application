<template>
  <div>
    <h2 id="page-heading" data-cy="WorkoutRoutineGroupHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.title')" id="workout-routine-group-heading"
        >Workout Routine Groups</span
      >
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WorkoutRoutineGroupCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-workout-routine-group"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.createLabel')">
              Create a new Workout Routine Group
            </span>
          </button>
        </router-link>
      </div>
    </h2>
    <div class="row">
      <div class="col-sm-12">
        <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
          <div class="input-group w-100 mt-3">
            <input
              type="text"
              class="form-control"
              name="currentSearch"
              id="currentSearch"
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.search')"
              v-model="currentSearch"
            />
            <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
              <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
            <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()" v-if="currentSearch">
              <font-awesome-icon icon="trash"></font-awesome-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && workoutRoutineGroups && workoutRoutineGroups.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.notFound')">No workoutRoutineGroups found</span>
    </div>
    <div class="table-responsive" v-if="workoutRoutineGroups && workoutRoutineGroups.length > 0">
      <table class="table table-striped" aria-describedby="workoutRoutineGroups">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.name')">Name</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.workoutRoutine')">Workout Routine</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workoutRoutineGroup in workoutRoutineGroups" :key="workoutRoutineGroup.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'WorkoutRoutineGroupView', params: { workoutRoutineGroupId: workoutRoutineGroup.id } }">{{
                workoutRoutineGroup.id
              }}</router-link>
            </td>
            <td>{{ workoutRoutineGroup.name }}</td>
            <td>
              <span v-for="(workoutRoutine, i) in workoutRoutineGroup.workoutRoutines" :key="workoutRoutine.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link
                  class="form-control-static"
                  :to="{ name: 'WorkoutRoutineView', params: { workoutRoutineId: workoutRoutine.id } }"
                  >{{ workoutRoutine.id }}</router-link
                >
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'WorkoutRoutineGroupView', params: { workoutRoutineGroupId: workoutRoutineGroup.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'WorkoutRoutineGroupEdit', params: { workoutRoutineGroupId: workoutRoutineGroup.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(workoutRoutineGroup)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="jhipsterSampleApplicationApp.workoutRoutineGroup.delete.question"
          data-cy="workoutRoutineGroupDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-workoutRoutineGroup-heading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Workout Routine Group?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-workoutRoutineGroup"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWorkoutRoutineGroup()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./workout-routine-group.component.ts"></script>
