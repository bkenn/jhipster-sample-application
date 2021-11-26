<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="repType">
        <h2 class="jh-entity-heading" data-cy="repTypeDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.repType.detail.title')">RepType</span> {{ repType.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.repType.name')">Name</span>
          </dt>
          <dd>
            <span>{{ repType.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.repType.display')">Display</span>
          </dt>
          <dd>
            <span>{{ repType.display }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="repType.id" :to="{ name: 'RepTypeEdit', params: { repTypeId: repType.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./rep-type-details.component.ts"></script>
