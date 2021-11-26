<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workoutExerciseSet.home.createOrEditLabel"
          data-cy="WorkoutExerciseSetCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.home.createOrEditLabel')"
        >
          Create or edit a WorkoutExerciseSet
        </h2>
        <div>
          <div class="form-group" v-if="workoutExerciseSet.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workoutExerciseSet.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.reps')"
              for="workout-exercise-set-reps"
              >Reps</label
            >
            <input
              type="number"
              class="form-control"
              name="reps"
              id="workout-exercise-set-reps"
              data-cy="reps"
              :class="{ valid: !$v.workoutExerciseSet.reps.$invalid, invalid: $v.workoutExerciseSet.reps.$invalid }"
              v-model.number="$v.workoutExerciseSet.reps.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.weight')"
              for="workout-exercise-set-weight"
              >Weight</label
            >
            <input
              type="number"
              class="form-control"
              name="weight"
              id="workout-exercise-set-weight"
              data-cy="weight"
              :class="{ valid: !$v.workoutExerciseSet.weight.$invalid, invalid: $v.workoutExerciseSet.weight.$invalid }"
              v-model.number="$v.workoutExerciseSet.weight.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.time')"
              for="workout-exercise-set-time"
              >Time</label
            >
            <input
              type="text"
              class="form-control"
              name="time"
              id="workout-exercise-set-time"
              data-cy="time"
              :class="{ valid: !$v.workoutExerciseSet.time.$invalid, invalid: $v.workoutExerciseSet.time.$invalid }"
              v-model="$v.workoutExerciseSet.time.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.complete')"
              for="workout-exercise-set-complete"
              >Complete</label
            >
            <input
              type="checkbox"
              class="form-check"
              name="complete"
              id="workout-exercise-set-complete"
              data-cy="complete"
              :class="{ valid: !$v.workoutExerciseSet.complete.$invalid, invalid: $v.workoutExerciseSet.complete.$invalid }"
              v-model="$v.workoutExerciseSet.complete.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.completeTime')"
              for="workout-exercise-set-completeTime"
              >Complete Time</label
            >
            <input
              type="text"
              class="form-control"
              name="completeTime"
              id="workout-exercise-set-completeTime"
              data-cy="completeTime"
              :class="{ valid: !$v.workoutExerciseSet.completeTime.$invalid, invalid: $v.workoutExerciseSet.completeTime.$invalid }"
              v-model="$v.workoutExerciseSet.completeTime.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workoutExerciseSet.workoutExercise')"
              for="workout-exercise-set-workoutExercise"
              >Workout Exercise</label
            >
            <select
              class="form-control"
              id="workout-exercise-set-workoutExercise"
              data-cy="workoutExercise"
              name="workoutExercise"
              v-model="workoutExerciseSet.workoutExercise"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workoutExerciseSet.workoutExercise && workoutExerciseOption.id === workoutExerciseSet.workoutExercise.id
                    ? workoutExerciseSet.workoutExercise
                    : workoutExerciseOption
                "
                v-for="workoutExerciseOption in workoutExercises"
                :key="workoutExerciseOption.id"
              >
                {{ workoutExerciseOption.id }}
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
            :disabled="$v.workoutExerciseSet.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-exercise-set-update.component.ts"></script>
