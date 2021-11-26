<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="progressPhoto">
        <h2 class="jh-entity-heading" data-cy="progressPhotoDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationApp.progressPhoto.detail.title')">ProgressPhoto</span> {{ progressPhoto.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.progressPhoto.note')">Note</span>
          </dt>
          <dd>
            <span>{{ progressPhoto.note }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.progressPhoto.image')">Image</span>
          </dt>
          <dd>
            <div v-if="progressPhoto.image">
              <a v-on:click="openFile(progressPhoto.imageContentType, progressPhoto.image)">
                <img
                  v-bind:src="'data:' + progressPhoto.imageContentType + ';base64,' + progressPhoto.image"
                  style="max-width: 100%"
                  alt="progressPhoto image"
                />
              </a>
              {{ progressPhoto.imageContentType }}, {{ byteSize(progressPhoto.image) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationApp.progressPhoto.weightDate')">Weight Date</span>
          </dt>
          <dd>
            <span v-if="progressPhoto.weightDate">{{ $d(Date.parse(progressPhoto.weightDate), 'long') }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="progressPhoto.id"
          :to="{ name: 'ProgressPhotoEdit', params: { progressPhotoId: progressPhoto.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./progress-photo-details.component.ts"></script>
