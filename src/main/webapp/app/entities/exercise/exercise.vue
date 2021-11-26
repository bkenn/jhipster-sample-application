<template>
  <div>
    <h2 id="page-heading" data-cy="ExerciseHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.exercise.home.title')" id="exercise-heading">Exercises</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.exercise.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ExerciseCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-exercise"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.exercise.home.createLabel')"> Create a new Exercise </span>
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.exercise.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && exercises && exercises.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.exercise.home.notFound')">No exercises found</span>
    </div>
    <div class="table-responsive" v-if="exercises && exercises.length > 0">
      <table class="table table-striped" aria-describedby="exercises">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.name')">Name</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.description')">Description</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.repType')">Rep Type</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseCategory')">Exercise Category</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.exerciseImage')">Exercise Image</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exercise.muscle')">Muscle</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exercise in exercises" :key="exercise.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ExerciseView', params: { exerciseId: exercise.id } }">{{ exercise.id }}</router-link>
            </td>
            <td>{{ exercise.name }}</td>
            <td>{{ exercise.description }}</td>
            <td>
              <div v-if="exercise.repType">
                <router-link :to="{ name: 'RepTypeView', params: { repTypeId: exercise.repType.id } }">{{
                  exercise.repType.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="exercise.exerciseCategory">
                <router-link :to="{ name: 'ExerciseCategoryView', params: { exerciseCategoryId: exercise.exerciseCategory.id } }">{{
                  exercise.exerciseCategory.id
                }}</router-link>
              </div>
            </td>
            <td>
              <span v-for="(exerciseImage, i) in exercise.exerciseImages" :key="exerciseImage.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link
                  class="form-control-static"
                  :to="{ name: 'ExerciseImageView', params: { exerciseImageId: exerciseImage.id } }"
                  >{{ exerciseImage.id }}</router-link
                >
              </span>
            </td>
            <td>
              <span v-for="(muscle, i) in exercise.muscles" :key="muscle.id"
                >{{ i > 0 ? ', ' : '' }}
                <router-link class="form-control-static" :to="{ name: 'MuscleView', params: { muscleId: muscle.id } }">{{
                  muscle.id
                }}</router-link>
              </span>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ExerciseView', params: { exerciseId: exercise.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ExerciseEdit', params: { exerciseId: exercise.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(exercise)"
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
          id="jhipsterSampleApplicationApp.exercise.delete.question"
          data-cy="exerciseDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-exercise-heading" v-text="$t('jhipsterSampleApplicationApp.exercise.delete.question', { id: removeId })">
          Are you sure you want to delete this Exercise?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-exercise"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeExercise()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./exercise.component.ts"></script>
