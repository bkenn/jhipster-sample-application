<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.muscle.home.createOrEditLabel"
          data-cy="MuscleCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.muscle.home.createOrEditLabel')"
        >
          Create or edit a Muscle
        </h2>
        <div>
          <div class="form-group" v-if="muscle.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="muscle.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.muscle.name')" for="muscle-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="muscle-name"
              data-cy="name"
              :class="{ valid: !$v.muscle.name.$invalid, invalid: $v.muscle.name.$invalid }"
              v-model="$v.muscle.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.muscle.description')" for="muscle-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="muscle-description"
              data-cy="description"
              :class="{ valid: !$v.muscle.description.$invalid, invalid: $v.muscle.description.$invalid }"
              v-model="$v.muscle.description.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.muscle.muscleOrder')" for="muscle-muscleOrder"
              >Muscle Order</label
            >
            <input
              type="number"
              class="form-control"
              name="muscleOrder"
              id="muscle-muscleOrder"
              data-cy="muscleOrder"
              :class="{ valid: !$v.muscle.muscleOrder.$invalid, invalid: $v.muscle.muscleOrder.$invalid }"
              v-model.number="$v.muscle.muscleOrder.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.muscle.imageUrlMain')" for="muscle-imageUrlMain"
              >Image Url Main</label
            >
            <input
              type="text"
              class="form-control"
              name="imageUrlMain"
              id="muscle-imageUrlMain"
              data-cy="imageUrlMain"
              :class="{ valid: !$v.muscle.imageUrlMain.$invalid, invalid: $v.muscle.imageUrlMain.$invalid }"
              v-model="$v.muscle.imageUrlMain.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.muscle.imageUrlSecondary')"
              for="muscle-imageUrlSecondary"
              >Image Url Secondary</label
            >
            <input
              type="text"
              class="form-control"
              name="imageUrlSecondary"
              id="muscle-imageUrlSecondary"
              data-cy="imageUrlSecondary"
              :class="{ valid: !$v.muscle.imageUrlSecondary.$invalid, invalid: $v.muscle.imageUrlSecondary.$invalid }"
              v-model="$v.muscle.imageUrlSecondary.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.muscle.front')" for="muscle-front">Front</label>
            <input
              type="checkbox"
              class="form-check"
              name="front"
              id="muscle-front"
              data-cy="front"
              :class="{ valid: !$v.muscle.front.$invalid, invalid: $v.muscle.front.$invalid }"
              v-model="$v.muscle.front.$model"
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
            :disabled="$v.muscle.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./muscle-update.component.ts"></script>
