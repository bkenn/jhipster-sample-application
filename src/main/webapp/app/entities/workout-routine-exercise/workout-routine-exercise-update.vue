<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutRoutineExercise.home.createOrEditLabel"
          data-cy="WorkoutRoutineExerciseCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.home.createOrEditLabel')"
        >
          Create or edit a WorkoutRoutineExercise
        </h2>
        <div>
          <div class="form-group" v-if="workoutRoutineExercise.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutRoutineExercise.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.note')"
              for="workout-routine-exercise-note"
              >Note</label
            >
            <input
              type="text"
              class="form-control"
              name="note"
              id="workout-routine-exercise-note"
              data-cy="note"
              :class="{ valid: !$v.workoutRoutineExercise.note.$invalid, invalid: $v.workoutRoutineExercise.note.$invalid }"
              v-model="$v.workoutRoutineExercise.note.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExercise.timer')"
              for="workout-routine-exercise-timer"
              >Timer</label
            >
            <input
              type="text"
              class="form-control"
              name="timer"
              id="workout-routine-exercise-timer"
              data-cy="timer"
              :class="{ valid: !$v.workoutRoutineExercise.timer.$invalid, invalid: $v.workoutRoutineExercise.timer.$invalid }"
              v-model="$v.workoutRoutineExercise.timer.$model"
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
            :disabled="$v.workoutRoutineExercise.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-routine-exercise-update.component.ts"></script>
