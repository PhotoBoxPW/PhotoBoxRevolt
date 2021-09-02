export type ImgSrvPayload = AnyTextPayload | AnyImagePayload | ColorPayload;

// #region Text Payloads
export type AnyTextPayload =
  | TextPayload
  | TextLadderPayload
  | AchievementPayload
  | CitationPayload
  | EliminatedPayload
  | UserPayload;

/** Payload for a generic text endpoint. */
export interface TextPayload {
  /** The text for the endpoint. */
  text: string;
}

/** Payload for `brain` and `wwe` endpoint. */
export interface TextLadderPayload {
  /** The texts for the endpoint. */
  texts: string[];
}

/** Payload for `achievement` endpoint. */
export interface AchievementPayload extends TextPayload {
  /** Whether to show as a challenge. */
  challenge?: boolean;
  /** The header of the achievment image. */
  header?: string;
  /** The X coord of the icon. */
  icon_x?: number;
  /** The Y coord of the icon. */
  icon_y?: number;
}

/** Payload for `citation` endpoint. */
export interface CitationPayload extends TextPayload {
  /** The header of the citation image. */
  header?: string;
  /** The footer of the citation image. */
  footer?: string;
}

/** Payload for `eliminated` endpoint. */
export interface EliminatedPayload extends TextPayload {
  /** Whether to show as a challenge. */
  elim_by?: boolean;
  /** Whether to not have a shadow behind the text. */
  no_shadow?: boolean;
}

/** Payload for `ttt` and `youtube` endpoint. */
export interface UserPayload extends TextPayload {
  /** The username in the image. */
  username: string;
  /** The user's avatar. */
  avatar: string;
}
// #endregion

// #region Image Payloads
export type AnyImagePayload =
  | ImagePayload
  | GifImagePayload
  | JPEGPayload
  | MagikPayload
  | MirrorPayload
  | DoubleImagePayload
  | WantedPayload;

/** Payload for a generic image endpoint. */
export interface ImagePayload {
  /** The image for the endpoint. */
  image: string;
  /** Whether to use the original image resolution. */
  original_res?: boolean;
}

/** Payload for a generic image endpoint that supports GIF manipulation. */
export interface GifImagePayload extends ImagePayload {
  /** Whether to allow sending/using GIFs. */
  allow_gif?: boolean;
}

/** Payload for `jpeg` endpoint. */
export interface JPEGPayload extends GifImagePayload {
  /** The quality of the image. */
  quality?: number;
}

/** Payload for `magik` endpoint. */
export interface MagikPayload extends ImagePayload {
  /** The multiplier of the liquid rescale. */
  mult?: number;
}

/** Payload for `dbots` endpoint. */
export interface DbotsPayload extends ImagePayload {
  /** Whether to remove the overlay for the image. */
  no_overlay?: boolean;
}

/** Payload for `blur` endpoint. */
export interface BlurPayload extends GifImagePayload {
  /** The radius to blur with. */
  radius?: number;
}

/** Payload for `mirror` and `verticalmirror` endpoint. */
export interface MirrorPayload extends GifImagePayload {
  /** Whether to use the last half of the image when mirroring. */
  last_half?: boolean;
}

/** Payload for `blurple` endpoint. */
export interface BlurplePayload extends GifImagePayload {
  /** Whether to use the new blurple color when filtering. */
  new_color?: boolean;
}

/** Payload for `wanted` endpoint. */
export interface WantedPayload extends ImagePayload {
  /** The user's username.. */
  username: string;
}

/** Payload for `ship` and `tinder` endpoint. */
export interface DoubleImagePayload {
  /** The first user's avatar. */
  avatar1: string;
  /** The second user's avatar. */
  avatar2: string;
}

/** Payload for `ship` endpoint. */
export interface HeartPayload extends DoubleImagePayload {
  /** The type of heart to use. */
  heart?: string;
}

/** Payload for `color` endpoint. */
export interface ColorPayload {
  /** The color you want to use. */
  color: string;
}
// #endregion
