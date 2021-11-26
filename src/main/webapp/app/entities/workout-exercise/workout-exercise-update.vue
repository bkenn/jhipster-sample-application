<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutExercise.home.createOrEditLabel"
          data-cy="WorkoutExerciseCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutExercise.home.createOrEditLabel')"
        >
          Create or edit a WorkoutExercise
        </h2>
        <div>
          <div class="form-group" v-if="workoutExercise.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutExercise.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workoutExercise.note')" for="workout-exercise-note"
              >Note</label
            >
            <input
              type="text"
              class="form-control"
              name="note"
              id="workout-exercise-note"
              data-cy="note"
              :class="{ valid: !$v.workoutExercise.note.$invalid, invalid: $v.workoutExercise.note.$invalid }"
              v-model="$v.workoutExercise.note.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workoutExercise.timer')" for="workout-exercise-timer"
              >Timer</label
            >
            <input
              type="text"
              class="form-control"
              name="timer"
              id="workout-exercise-timer"
              data-cy="timer"
              :class="{ valid: !$v.workoutExercise.timer.$invalid, invalid: $v.workoutExercise.timer.$invalid }"
              v-model="$v.workoutExercise.timer.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExercise.exercise')"
              for="workout-exercise-exercise"
              >Exercise</label
            >
            <select
              class="form-control"
              id="workout-exercise-exercise"
              data-cy="exercise"
              name="exercise"
              v-model="workoutExercise.exercise"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutExercise.exercise && exerciseOption.id === workoutExercise.exercise.id ? workoutExercise.exercise : exerciseOption
                "
                v-for="exerciseOption in exercises"
                :key="exerciseOption.id"
              >
                {{ exerciseOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workoutRoutineExercise')"
              for="workout-exercise-workoutRoutineExercise"
              >Workout Routine Exercise</label
            >
            <select
              class="form-control"
              id="workout-exercise-workoutRoutineExercise"
              data-cy="workoutRoutineExercise"
              name="workoutRoutineExercise"
              v-model="workoutExercise.workoutRoutineExercise"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutExercise.workoutRoutineExercise && workoutRoutineExerciseOption.id === workoutExercise.workoutRoutineExercise.id
                    ? workoutExercise.workoutRoutineExercise
                    : workoutRoutineExerciseOption
                "
                v-for="workoutRoutineExerciseOption in workoutRoutineExercises"
                :key="workoutRoutineExerciseOption.id"
              >
                {{ workoutRoutineExerciseOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExercise.workout')"
              for="workout-exercise-workout"
              >Workout</label
            >
            <select class="form-control" id="workout-exercise-workout" data-cy="workout" name="workout" v-model="workoutExercise.workout">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutExercise.workout && workoutOption.id === workoutExercise.workout.id ? workoutExercise.workout : workoutOption
                "
                v-for="workoutOption in workouts"
                :key="workoutOption.id"
              >
                {{ workoutOption.id }}
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
            :disabled="$v.workoutExercise.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-exercise-update.component.ts"></script>
