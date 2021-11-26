<template>
  <div>
    <h2 id="page-heading" data-cy="WorkoutHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.workout.home.title')" id="workout-heading">Workouts</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.workout.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WorkoutCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-workout"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.workout.home.createLabel')"> Create a new Workout </span>
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.workout.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && workouts && workouts.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.workout.home.notFound')">No workouts found</span>
    </div>
    <div class="table-responsive" v-if="workouts && workouts.length > 0">
      <table class="table table-striped" aria-describedby="workouts">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workout.title')">Title</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workout.description')">Description</span></th>
            <th scope="row">
              <span v-text="$t('jhipsterSampleApplicationApp.workout.workoutStartDateTime')">Workout Start Date Time</span>
            </th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workout.workoutEndDateTime')">Workout End Date Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workout.workoutRoutine')">Workout Routine</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workout.user')">User</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workout in workouts" :key="workout.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'WorkoutView', params: { workoutId: workout.id } }">{{ workout.id }}</router-link>
            </td>
            <td>{{ workout.title }}</td>
            <td>{{ workout.description }}</td>
            <td>{{ workout.workoutStartDateTime ? $d(Date.parse(workout.workoutStartDateTime), 'short') : '' }}</td>
            <td>{{ workout.workoutEndDateTime ? $d(Date.parse(workout.workoutEndDateTime), 'short') : '' }}</td>
            <td>
              <div v-if="workout.workoutRoutine">
                <router-link :to="{ name: 'WorkoutRoutineView', params: { workoutRoutineId: workout.workoutRoutine.id } }">{{
                  workout.workoutRoutine.id
                }}</router-link>
              </div>
            </td>
            <td>
              {{ workout.user ? workout.user.id : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'WorkoutView', params: { workoutId: workout.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'WorkoutEdit', params: { workoutId: workout.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(workout)"
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
          id="jhipsterSampleApplicationApp.workout.delete.question"
          data-cy="workoutDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-workout-heading" v-text="$t('jhipsterSampleApplicationApp.workout.delete.question', { id: removeId })">
          Are you sure you want to delete this Workout?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-workout"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWorkout()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./workout.component.ts"></script>
