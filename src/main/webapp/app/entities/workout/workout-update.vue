<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationApp.workout.home.createOrEditLabel"
          data-cy="WorkoutCreateUpdateHeading"
          v-text="$t('jhipsterSampleApplicationApp.workout.home.createOrEditLabel')"
        >
          Create or edit a Workout
        </h2>
        <div>
          <div class="form-group" v-if="workout.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="workout.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workout.title')" for="workout-title">Title</label>
            <input
              type="text"
              class="form-control"
              name="title"
              id="workout-title"
              data-cy="title"
              :class="{ valid: !$v.workout.title.$invalid, invalid: $v.workout.title.$invalid }"
              v-model="$v.workout.title.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workout.description')" for="workout-description"
              >Description</label
            >
            <input
              type="text"
              class="form-control"
              name="description"
              id="workout-description"
              data-cy="description"
              :class="{ valid: !$v.workout.description.$invalid, invalid: $v.workout.description.$invalid }"
              v-model="$v.workout.description.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workout.workoutStartDateTime')"
              for="workout-workoutStartDateTime"
              >Workout Start Date Time</label
            >
            <div class="d-flex">
              <input
                id="workout-workoutStartDateTime"
                data-cy="workoutStartDateTime"
                type="datetime-local"
                class="form-control"
                name="workoutStartDateTime"
                :class="{ valid: !$v.workout.workoutStartDateTime.$invalid, invalid: $v.workout.workoutStartDateTime.$invalid }"
                :value="convertDateTimeFromServer($v.workout.workoutStartDateTime.$model)"
                @change="updateZonedDateTimeField('workoutStartDateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workout.workoutEndDateTime')"
              for="workout-workoutEndDateTime"
              >Workout End Date Time</label
            >
            <div class="d-flex">
              <input
                id="workout-workoutEndDateTime"
                data-cy="workoutEndDateTime"
                type="datetime-local"
                class="form-control"
                name="workoutEndDateTime"
                :class="{ valid: !$v.workout.workoutEndDateTime.$invalid, invalid: $v.workout.workoutEndDateTime.$invalid }"
                :value="convertDateTimeFromServer($v.workout.workoutEndDateTime.$model)"
                @change="updateZonedDateTimeField('workoutEndDateTime', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('jhipsterSampleApplicationApp.workout.workoutRoutine')"
              for="workout-workoutRoutine"
              >Workout Routine</label
            >
            <select
              class="form-control"
              id="workout-workoutRoutine"
              data-cy="workoutRoutine"
              name="workoutRoutine"
              v-model="workout.workoutRoutine"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  workout.workoutRoutine && workoutRoutineOption.id === workout.workoutRoutine.id
                    ? workout.workoutRoutine
                    : workoutRoutineOption
                "
                v-for="workoutRoutineOption in workoutRoutines"
                :key="workoutRoutineOption.id"
              >
                {{ workoutRoutineOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('jhipsterSampleApplicationApp.workout.user')" for="workout-user">User</label>
            <select class="form-control" id="workout-user" data-cy="user" name="user" v-model="workout.user">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="workout.user && userOption.id === workout.user.id ? workout.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.id }}
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
            :disabled="$v.workout.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./workout-update.component.ts"></script>
