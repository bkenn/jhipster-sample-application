<template>
  <div>
    <h2 id="page-heading" data-cy="WorkoutRoutineExerciseSetHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.title')" id="workout-routine-exercise-set-heading"
        >Workout Routine Exercise Sets</span
      >
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WorkoutRoutineExerciseSetCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-workout-routine-exercise-set"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.createLabel')">
              Create a new Workout Routine Exercise Set
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && workoutRoutineExerciseSets && workoutRoutineExerciseSets.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.notFound')">No workoutRoutineExerciseSets found</span>
    </div>
    <div class="table-responsive" v-if="workoutRoutineExerciseSets && workoutRoutineExerciseSets.length > 0">
      <table class="table table-striped" aria-describedby="workoutRoutineExerciseSets">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.reps')">Reps</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.weight')">Weight</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.time')">Time</span></th>
            <th scope="row">
              <span v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.workoutRoutineExercise')"
                >Workout Routine Exercise</span
              >
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="workoutRoutineExerciseSet in workoutRoutineExerciseSets" :key="workoutRoutineExerciseSet.id" data-cy="entityTable">
            <td>
              <router-link
                :to="{ name: 'WorkoutRoutineExerciseSetView', params: { workoutRoutineExerciseSetId: workoutRoutineExerciseSet.id } }"
                >{{ workoutRoutineExerciseSet.id }}</router-link
              >
            </td>
            <td>{{ workoutRoutineExerciseSet.reps }}</td>
            <td>{{ workoutRoutineExerciseSet.weight }}</td>
            <td>{{ workoutRoutineExerciseSet.time | duration }}</td>
            <td>
              <div v-if="workoutRoutineExerciseSet.workoutRoutineExercise">
                <router-link
                  :to="{
                    name: 'WorkoutRoutineExerciseView',
                    params: { workoutRoutineExerciseId: workoutRoutineExerciseSet.workoutRoutineExercise.id },
                  }"
                  >{{ workoutRoutineExerciseSet.workoutRoutineExercise.id }}</router-link
                >
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'WorkoutRoutineExerciseSetView', params: { workoutRoutineExerciseSetId: workoutRoutineExerciseSet.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'WorkoutRoutineExerciseSetEdit', params: { workoutRoutineExerciseSetId: workoutRoutineExerciseSet.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(workoutRoutineExerciseSet)"
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
          id="jhipsterSampleApplicationApp.workoutRoutineExerciseSet.delete.question"
          data-cy="workoutRoutineExerciseSetDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-workoutRoutineExerciseSet-heading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Workout Routine Exercise Set?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-workoutRoutineExerciseSet"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWorkoutRoutineExerciseSet()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./workout-routine-exercise-set.component.ts"></script>
