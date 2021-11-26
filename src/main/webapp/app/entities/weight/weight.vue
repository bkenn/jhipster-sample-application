<template>
  <div>
    <h2 id="page-heading" data-cy="WeightHeading">
      <span v-text="$t('jhipsterSampleApplicationApp.weight.home.title')" id="weight-heading">Weights</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationApp.weight.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'WeightCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-weight"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('jhipsterSampleApplicationApp.weight.home.createLabel')"> Create a new Weight </span>
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
              v-bind:placeholder="$t('jhipsterSampleApplicationApp.weight.home.search')"
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
    <div class="alert alert-warning" v-if="!isFetching && weights && weights.length === 0">
      <span v-text="$t('jhipsterSampleApplicationApp.weight.home.notFound')">No weights found</span>
    </div>
    <div class="table-responsive" v-if="weights && weights.length > 0">
      <table class="table table-striped" aria-describedby="weights">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.weight.value')">Value</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.weight.weightDateTime')">Weight Date Time</span></th>
            <th scope="row"><span v-text="$t('jhipsterSampleApplicationApp.weight.measurementType')">Measurement Type</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="weight in weights" :key="weight.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'WeightView', params: { weightId: weight.id } }">{{ weight.id }}</router-link>
            </td>
            <td>{{ weight.value }}</td>
            <td>{{ weight.weightDateTime ? $d(Date.parse(weight.weightDateTime), 'short') : '' }}</td>
            <td>
              <div v-if="weight.measurementType">
                <router-link :to="{ name: 'MeasurementTypeView', params: { measurementTypeId: weight.measurementType.id } }">{{
                  weight.measurementType.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'WeightView', params: { weightId: weight.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'WeightEdit', params: { weightId: weight.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(weight)"
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
          id="jhipsterSampleApplicationApp.weight.delete.question"
          data-cy="weightDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-weight-heading" v-text="$t('jhipsterSampleApplicationApp.weight.delete.question', { id: removeId })">
          Are you sure you want to delete this Weight?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-weight"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeWeight()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./weight.component.ts"></script>
