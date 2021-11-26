<template>
  <div>
    <h2 id="page-heading" data-cy="ExerciseImageHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.home.title')" id="exercise-image-heading">Exercise Images</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ExerciseImageCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-exercise-image"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.home.createLabel')"> Create a new Exercise Image </span>
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.exerciseImage.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && exerciseImages && exerciseImages.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.home.notFound')">No exerciseImages found</span>
    </div>
    <div class="table-responsive" v-if="exerciseImages && exerciseImages.length > 0">
      <table class="table table-striped" aria-describedby="exerciseImages">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.uuid')">Uuid</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.image')">Image</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.exerciseImage.main')">Main</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exerciseImage in exerciseImages" :key="exerciseImage.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ExerciseImageView', params: { exerciseImageId: exerciseImage.id } }">{{
                exerciseImage.id
              }}</router-link>
            </td>
            <td>{{ exerciseImage.uuid }}</td>
            <td>
              <a v-if="exerciseImage.image" v-on:click="openFile(exerciseImage.imageContentType, exerciseImage.image)">
                <img
                  v-bind:src="'data:' + exerciseImage.imageContentType + ';base64,' + exerciseImage.image"
                  style="max-height: 30px"
                  alt="exerciseImage image"
                />
              </a>
              <span v-if="exerciseImage.image">{{ exerciseImage.imageContentType }}, {{ byteSize(exerciseImage.image) }}</span>
            </td>
            <td>{{ exerciseImage.main }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'ExerciseImageView', params: { exerciseImageId: exerciseImage.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'ExerciseImageEdit', params: { exerciseImageId: exerciseImage.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(exerciseImage)"
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
          id="jhipsterSampleApplicationApp.exerciseImage.delete.question"
          data-cy="exerciseImageDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-exerciseImage-heading"
          v-text="$t('jhipsterSampleApplicationApp.exerciseImage.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Exercise Image?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-exerciseImage"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeExerciseImage()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./exercise-image.component.ts"></script>
