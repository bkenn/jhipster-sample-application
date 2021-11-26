<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutRoutine.home.createOrEditLabel"
          data-cy="WorkoutRoutineCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.home.createOrEditLabel')"
        >
          Create or edit a WorkoutRoutine
        </h2>
        <div>
          <div class="form-group" v-if="workoutRoutine.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutRoutine.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.title')" for="workout-routine-title"
              >Title</label
            >
            <input
              type="text"
              class="form-control"
              name="title"
              id="workout-routine-title"
              data-cy="title"
              :class="{ valid: !$v.workoutRoutine.title.$invalid, invalid: $v.workoutRoutine.title.$invalid }"
              v-model="$v.workoutRoutine.title.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.description')"
              for="workout-routine-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="workout-routine-description"
              data-cy="description"
              :class="{ valid: !$v.workoutRoutine.description.$invalid, invalid: $v.workoutRoutine.description.$invalid }"
              v-model="$v.workoutRoutine.description.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutine.workoutRoutineExercise')"
              for="workout-routine-workoutRoutineExercise"
              >Workout Routine Exercise</label
            >
            <select
              class="form-control"
              id="workout-routine-workoutRoutineExercise"
              data-cy="workoutRoutineExercise"
              name="workoutRoutineExercise"
              v-model="workoutRoutine.workoutRoutineExercise"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutRoutine.workoutRoutineExercise && workoutRoutineExerciseOption.id === workoutRoutine.workoutRoutineExercise.id
                    ? workoutRoutine.workoutRoutineExercise
                    : workoutRoutineExerciseOption
                "
                v-for="workoutRoutineExerciseOption in workoutRoutineExercises"
                :key="workoutRoutineExerciseOption.id"
              >
                {{ workoutRoutineExerciseOption.id }}
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
            :disabled="$v.workoutRoutine.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-routine-update.component.ts"></script>
