/* eslint-disable no-unused-vars */
import { ChangeEvent } from 'react';
type LogLevel = 'debug' | 'error' | 'info' | 'warn';
type PlayerState = 'Buffering' | 'Ended' | 'Idle' | 'Playing' | 'Ready';

interface Quality {
  bitrate: number;
  codecs: string;
  name: string;
  height: number;
  width: number;
}

interface BufferRange {
  end: number;
  start: number;
}

export interface MediaPlayer {
  addEventListener: (name: string, fn: (payload: Event) => void) => void;
  attachHTMLVideoElement: (videoElement: HTMLVideoElement) => void;
  delete: () => void;
  getBufferDuration: () => number;
  getBuffered: () => BufferRange;
  getDisplayHeight: () => number;
  getDisplayWidth: () => number;
  getDuration: () => number;
  getHTMLVideoElement: () => HTMLVideoElement;
  getLiveLatency: () => number;
  getPlaybackRate: () => number;
  getPosition: () => number;
  getQualities: () => Quality[];
  getQuality: () => Quality;
  getSessionId: () => string | undefined;
  getState: () => PlayerState;
  getVersion: () => string;
  getVolume: () => number;
  isAutoQualityMode: () => boolean;
  isAutoplay: () => boolean;
  isLiveLowLatency: () => boolean;
  isMuted: () => boolean;
  isPaused: () => boolean;
  load: (path: string, mediaType?: string) => void;
  pause: () => void;
  play: () => void;
  removeEventListener: (name: string, fn: (payload: Event) => void) => void;
  seekTo: (time: number) => void;
  setAutoMaxBitrate: (bitrate: number) => void;
  setAutoMaxQuality: (quality: Quality) => void;
  setAutoQualityMode: (enable: boolean) => void;
  setAutoplay: (enabled: boolean) => void;
  setLiveLowLatencyEnabled: (enable: boolean) => void;
  setLogLevel: (level: LogLevel) => void;
  setMuted: (mute: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setQuality: (quality: Quality, adaptive?: boolean) => void;
  setVolume: (volume: number) => void;
}

export interface HTMLVideoPicture {
  requestPictureInPicture(): void;
  onleavepictureinpicture(): void;
  webkitEnterFullscreen(): void;
  webkitExitFullScreen(): void;
  webkitDisplayingFullscreen: boolean;
}

export type StreamPlayerType = HTMLVideoPicture & HTMLVideoElement;

export type Dimensions = {
  width: number;
  height: number;
};

export type PlayerControls = {
  BUFFERING: string;
  firstTimeMuted: boolean;
  fullScreen: boolean;
  handleFullScreen: () => void;
  handleFullScreenMobile: () => void;
  handleMainButton: () => void;
  handleMobileOptions: () => void;
  handleMute: () => void;
  handleNothing: () => void;
  handlePictureAndPicture: () => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  IDLE: string;
  inactive: boolean;
  isVerticalLayout: boolean;
  muted: boolean;
  overlay: boolean;
  pictureInPicture: boolean;
  PLAYING: string;
  setInactive: React.Dispatch<React.SetStateAction<boolean>>;
  setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  showOptions: boolean;
  status: string;
  videoEl: React.RefObject<StreamPlayerType>;
  volume: number;
  progress: number;
  handleVideoProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOpenShare: () => void;
  isFinalized: boolean;
  setShowVariation: React.Dispatch<React.SetStateAction<string>>;
  transmitionType: string | undefined;
};
