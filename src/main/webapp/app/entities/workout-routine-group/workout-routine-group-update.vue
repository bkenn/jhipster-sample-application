<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutRoutineGroup.home.createOrEditLabel"
          data-cy="WorkoutRoutineGroupCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.home.createOrEditLabel')"
        >
          Create or edit a WorkoutRoutineGroup
        </h2>
        <div>
          <div class="form-group" v-if="workoutRoutineGroup.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutRoutineGroup.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.name')"
              for="workout-routine-group-name"
              >Name</label
            >
            <input
              type="text"
              class="form-control"
              name="name"
              id="workout-routine-group-name"
              data-cy="name"
              :class="{ valid: !$v.workoutRoutineGroup.name.$invalid, invalid: $v.workoutRoutineGroup.name.$invalid }"
              v-model="$v.workoutRoutineGroup.name.$model"
            />
          </div>
          <div class="form-group">
            <label v-text="$t('jhipsterSampleApplicationApp.workoutRoutineGroup.workoutRoutine')" for="workout-routine-group-workoutRoutine"
              >Workout Routine</label
            >
            <select
              class="form-control"
              id="workout-routine-group-workoutRoutines"
              data-cy="workoutRoutine"
              multiple
              name="workoutRoutine"
              v-if="workoutRoutineGroup.workoutRoutines !== undefined"
              v-model="workoutRoutineGroup.workoutRoutines"
            >
              <option
                v-bind:value="getSelected(workoutRoutineGroup.workoutRoutines, workoutRoutineOption)"
                v-for="workoutRoutineOption in workoutRoutines"
                :key="workoutRoutineOption.id"
              >
                {{ workoutRoutineOption.id }}
              </option>
            </select>
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
            :disabled="$v.workoutRoutineGroup.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-routine-group-update.component.ts"></script>
