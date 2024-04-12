import { mande } from 'mande'

const artworks = mande('https://api.artic.edu/api/v1/artworks')

export function getArtworksList() {
  return artworks.get<APIResponsePaginated<Artwork[]>>('/')
}

export function getArtwork(id: number) {
  return artworks.get<APIResponse<Artwork>>(id)
}

interface APIResponse<Data> {
  data: Data;
  info: LicenseInfo;
  config: Config;
}
interface APIResponsePaginated<Data> extends APIResponse<Data> {
  pagination: Pagination;
}


interface Thumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

interface DimensionDetail {
  depth: number | null;
  width: number;
  height: number;
  diameter: number | null;
  clarification: string | null;
}

interface Color {
  h: number;
  l: number;
  s: number;
  percentage: number;
  population: number;
}

interface AutocompleteInput {
  input: string[];
  weight?: number;
  contexts: {
      groupings: string[];
  };
}

interface Artwork {
  id: number;
  api_model: string;
  api_link: string;
  is_boosted: boolean;
  title: string;
  alt_titles: null;
  thumbnail: Thumbnail;
  main_reference_number: string;
  has_not_been_viewed_much: boolean;
  boost_rank: null;
  date_start: number;
  date_end: number;
  date_display: string;
  date_qualifier_title: string;
  date_qualifier_id: null;
  artist_display: string;
  place_of_origin: string;
  description: string;
  short_description: string | null;
  dimensions: string;
  dimensions_detail: DimensionDetail[];
  medium_display: string;
  inscriptions: string;
  credit_line: string;
  catalogue_display: string | null;
  publication_history: string;
  exhibition_history: string;
  provenance_text: string;
  edition: null;
  publishing_verification_level: string;
  internal_department_id: number;
  fiscal_year: number;
  fiscal_year_deaccession: null;
  is_public_domain: boolean;
  is_zoomable: boolean;
  max_zoom_window_size: number;
  copyright_notice: string | null;
  has_multimedia_resources: boolean;
  has_educational_resources: boolean;
  has_advanced_imaging: boolean;
  colorfulness: number;
  color: Color;
  latitude: number | null;
  longitude: number | null;
  latlon: null;
  is_on_view: boolean;
  on_loan_display: string;
  gallery_title: null;
  gallery_id: null;
  nomisma_id: null;
  artwork_type_title: string;
  artwork_type_id: number;
  department_title: string;
  department_id: string;
  artist_id: number;
  artist_title: string;
  alt_artist_ids: any[];
  artist_ids: number[];
  artist_titles: string[];
  category_ids: string[];
  category_titles: string[];
  term_titles: string[];
  style_id: string | null;
  style_title: string | null;
  alt_style_ids: any[];
  style_ids: string[];
  style_titles: string[];
  classification_id: string;
  classification_title: string;
  alt_classification_ids: string[];
  classification_ids: string[];
  classification_titles: string[];
  subject_id: string;
  alt_subject_ids: string[];
  subject_ids: string[];
  subject_titles: string[];
  material_id: string;
  alt_material_ids: string[];
  material_ids: string[];
  material_titles: string[];
  technique_id: string;
  alt_technique_ids: string[];
  technique_ids: string[];
  technique_titles: string[];
  theme_titles: string[];
  image_id: string;
  alt_image_ids: any[];
  document_ids: any[];
  sound_ids: any[];
  video_ids: any[];
  text_ids: any[];
  section_ids: number[];
  section_titles: string[];
  site_ids: any[];
  suggest_autocomplete_boosted: string;
  suggest_autocomplete_all: AutocompleteInput[];
  source_updated_at: string;
  updated_at: string;
  timestamp: string;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

interface LicenseInfo {
  license_text: string;
  license_links: string[];
  version: string;
}

interface Config {
  iiif_url: string;
  website_url: string;
}
