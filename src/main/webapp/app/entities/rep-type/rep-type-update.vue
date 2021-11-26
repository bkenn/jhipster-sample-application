<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.repType.home.createOrEditLabel"
          data-cy="RepTypeCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.repType.home.createOrEditLabel')"
        >
          Create or edit a RepType
        </h2>
        <div>
          <div class="form-group" v-if="repType.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="repType.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.repType.name')" for="rep-type-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="rep-type-name"
              data-cy="name"
              :class="{ valid: !$v.repType.name.$invalid, invalid: $v.repType.name.$invalid }"
              v-model="$v.repType.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.repType.display')" for="rep-type-display"
              >Display</label
            >
            <input
              type="text"
              class="form-control"
              name="display"
              id="rep-type-display"
              data-cy="display"
              :class="{ valid: !$v.repType.display.$invalid, invalid: $v.repType.display.$invalid }"
              v-model="$v.repType.display.$model"
            />
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.repType.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./rep-type-update.component.ts"></script>
