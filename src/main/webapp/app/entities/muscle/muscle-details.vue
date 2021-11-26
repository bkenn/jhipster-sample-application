<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="muscle">
        <h2 class="jh-entity-heading" data-cy="muscleDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.muscle.detail.title')">Muscle</span> {{ muscle.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.name')">Name</span>
          </dt>
          <dd>
            <span>{{ muscle.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.description')">Description</span>
          </dt>
          <dd>
            <span>{{ muscle.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.muscleOrder')">Muscle Order</span>
          </dt>
          <dd>
            <span>{{ muscle.muscleOrder }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.imageUrlMain')">Image Url Main</span>
          </dt>
          <dd>
            <span>{{ muscle.imageUrlMain }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.imageUrlSecondary')">Image Url Secondary</span>
          </dt>
          <dd>
            <span>{{ muscle.imageUrlSecondary }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.muscle.front')">Front</span>
          </dt>
          <dd>
            <span>{{ muscle.front }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="muscle.id" :to="{ name: 'MuscleEdit', params: { muscleId: muscle.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./muscle-details.component.ts"></script>
