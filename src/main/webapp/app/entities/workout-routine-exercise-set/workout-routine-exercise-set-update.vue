<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.createOrEditLabel"
          data-cy="WorkoutRoutineExerciseSetCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.home.createOrEditLabel')"
        >
          Create or edit a WorkoutRoutineExerciseSet
        </h2>
        <div>
          <div class="form-group" v-if="workoutRoutineExerciseSet.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutRoutineExerciseSet.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.reps')"
              for="workout-routine-exercise-set-reps"
              >Reps</label
            >
            <input
              type="number"
              class="form-control"
              name="reps"
              id="workout-routine-exercise-set-reps"
              data-cy="reps"
              :class="{ valid: !$v.workoutRoutineExerciseSet.reps.$invalid, invalid: $v.workoutRoutineExerciseSet.reps.$invalid }"
              v-model.number="$v.workoutRoutineExerciseSet.reps.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.weight')"
              for="workout-routine-exercise-set-weight"
              >Weight</label
            >
            <input
              type="number"
              class="form-control"
              name="weight"
              id="workout-routine-exercise-set-weight"
              data-cy="weight"
              :class="{ valid: !$v.workoutRoutineExerciseSet.weight.$invalid, invalid: $v.workoutRoutineExerciseSet.weight.$invalid }"
              v-model.number="$v.workoutRoutineExerciseSet.weight.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.time')"
              for="workout-routine-exercise-set-time"
              >Time</label
            >
            <input
              type="text"
              class="form-control"
              name="time"
              id="workout-routine-exercise-set-time"
              data-cy="time"
              :class="{ valid: !$v.workoutRoutineExerciseSet.time.$invalid, invalid: $v.workoutRoutineExerciseSet.time.$invalid }"
              v-model="$v.workoutRoutineExerciseSet.time.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutRoutineExerciseSet.workoutRoutineExercise')"
              for="workout-routine-exercise-set-workoutRoutineExercise"
              >Workout Routine Exercise</label
            >
            <select
              class="form-control"
              id="workout-routine-exercise-set-workoutRoutineExercise"
              data-cy="workoutRoutineExercise"
              name="workoutRoutineExercise"
              v-model="workoutRoutineExerciseSet.workoutRoutineExercise"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutRoutineExerciseSet.workoutRoutineExercise &&
                  workoutRoutineExerciseOption.id === workoutRoutineExerciseSet.workoutRoutineExercise.id
                    ? workoutRoutineExerciseSet.workoutRoutineExercise
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
            :disabled="$v.workoutRoutineExerciseSet.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-routine-exercise-set-update.component.ts"></script>
