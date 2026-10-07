/* GERADO por scripts/extract-content.mjs — nao editar a mao. */
import type { Page } from '../types';
import { home } from './home';
import { page_about__careers } from './about__careers';
import { page_about__compliance } from './about__compliance';
import { page_about } from './about';
import { page_case_packing__bag_case_packer } from './case-packing__bag-case-packer';
import { page_case_packing__carton_case_packer } from './case-packing__carton-case-packer';
import { page_case_packing__cup_and_tub_case_packer } from './case-packing__cup-and-tub-case-packer';
import { page_case_packing__drop_packer } from './case-packing__drop-packer';
import { page_case_packing__flow_wrap_case_packer } from './case-packing__flow-wrap-case-packer';
import { page_case_packing } from './case-packing';
import { page_case_packing__integrated_case_packer } from './case-packing__integrated-case-packer';
import { page_case_packing__pillow_bag_case_packer } from './case-packing__pillow-bag-case-packer';
import { page_case_packing__pouch_case_packer } from './case-packing__pouch-case-packer';
import { page_case_packing__robotic_case_packer } from './case-packing__robotic-case-packer';
import { page_case_packing__thermoformed_package_case_packer } from './case-packing__thermoformed-package-case-packer';
import { page_case_packing__top_load_case_packer } from './case-packing__top-load-case-packer';
import { page_case_packing__tray_packer } from './case-packing__tray-packer';
import { page_case_packing__tx__dallas } from './case-packing__tx__dallas';
import { page_contact } from './contact';
import { page_conveyor_systems__accumulation_and_flow_control } from './conveyor-systems__accumulation-and-flow-control';
import { page_conveyor_systems__ca__fresno } from './conveyor-systems__ca__fresno';
import { page_conveyor_systems__case_conveyor_intralogistics } from './conveyor-systems__case-conveyor-intralogistics';
import { page_conveyor_systems__curves_and_transfers } from './conveyor-systems__curves-and-transfers';
import { page_conveyor_systems__elevation_conveyors } from './conveyor-systems__elevation-conveyors';
import { page_conveyor_systems__end_of_line_integration } from './conveyor-systems__end-of-line-integration';
import { page_conveyor_systems__hygienic_food_conveyor__dry } from './conveyor-systems__hygienic-food-conveyor__dry';
import { page_conveyor_systems__hygienic_food_conveyor } from './conveyor-systems__hygienic-food-conveyor';
import { page_conveyor_systems__hygienic_food_conveyor__washdown } from './conveyor-systems__hygienic-food-conveyor__washdown';
import { page_conveyor_systems } from './conveyor-systems';
import { page_conveyor_systems__merge_divert_and_sorting } from './conveyor-systems__merge-divert-and-sorting';
import { page_conveyor_systems__straight_conveying } from './conveyor-systems__straight-conveying';
import { page_industries__bakery_and_snacks } from './industries__bakery-and-snacks';
import { page_industries__beverage } from './industries__beverage';
import { page_industries__chemicals } from './industries__chemicals';
import { page_industries__co_packers } from './industries__co-packers';
import { page_industries__confectionery } from './industries__confectionery';
import { page_industries__consumer_packaged_goods } from './industries__consumer-packaged-goods';
import { page_industries__dairy_and_cheese } from './industries__dairy-and-cheese';
import { page_industries__e_commerce_and_distribution } from './industries__e-commerce-and-distribution';
import { page_industries__food_processing } from './industries__food-processing';
import { page_industries__frozen_food_and_ice_cream } from './industries__frozen-food-and-ice-cream';
import { page_industries__household_and_cleaning_products } from './industries__household-and-cleaning-products';
import { page_industries } from './industries';
import { page_industries__paper_and_packaging } from './industries__paper-and-packaging';
import { page_industries__personal_care_and_cosmetics } from './industries__personal-care-and-cosmetics';
import { page_industries__pet_food } from './industries__pet-food';
import { page_industries__pharmaceutical } from './industries__pharmaceutical';
import { page_industries__protein_processing } from './industries__protein-processing';
import { page_locations } from './locations';
import { page_parts_and_service } from './parts-and-service';
import { page_privacy_choices } from './privacy-choices';
import { page_privacy_policy } from './privacy-policy';
import { page_resources__blog__how_much_does_a_robotic_palletizer_cost } from './resources__blog__how-much-does-a-robotic-palletizer-cost';
import { page_resources__blog } from './resources__blog';
import { page_resources__case_studies__avon } from './resources__case-studies__avon';
import { page_resources__case_studies__custom_foods } from './resources__case-studies__custom-foods';
import { page_resources__case_studies } from './resources__case-studies';
import { page_resources__case_studies__lodge_cast_iron } from './resources__case-studies__lodge-cast-iron';
import { page_resources__downloads } from './resources__downloads';
import { page_resources__e_books } from './resources__e-books';
import { page_resources } from './resources';
import { page_resources__trade_shows_and_events } from './resources__trade-shows-and-events';
import { page_resources__trade_shows_and_events__pack_expo_international_2026 } from './resources__trade-shows-and-events__pack-expo-international-2026';
import { page_resources__webinars } from './resources__webinars';
import { page_resources__white_papers } from './resources__white-papers';
import { page_robotic_palletizing__bag_palletizer } from './robotic-palletizing__bag-palletizer';
import { page_robotic_palletizing__box_palletizer } from './robotic-palletizing__box-palletizer';
import { page_robotic_palletizing__bucket_palletizer } from './robotic-palletizing__bucket-palletizer';
import { page_robotic_palletizing__bundle_palletizer } from './robotic-palletizing__bundle-palletizer';
import { page_robotic_palletizing__carton_palletizer } from './robotic-palletizing__carton-palletizer';
import { page_robotic_palletizing__case_palletizer } from './robotic-palletizing__case-palletizer';
import { page_robotic_palletizing__cobot_palletizer } from './robotic-palletizing__cobot-palletizer';
import { page_robotic_palletizing__compact_palletizer } from './robotic-palletizing__compact-palletizer';
import { page_robotic_palletizing__custom_palletizer } from './robotic-palletizing__custom-palletizer';
import { page_robotic_palletizing__drum_palletizer } from './robotic-palletizing__drum-palletizer';
import { page_robotic_palletizing__high_speed_palletizer } from './robotic-palletizing__high-speed-palletizer';
import { page_robotic_palletizing } from './robotic-palletizing';
import { page_robotic_palletizing__ks__lenexa } from './robotic-palletizing__ks__lenexa';
import { page_robotic_palletizing__robotic_palletizer_cost } from './robotic-palletizing__robotic-palletizer-cost';
import { page_robotic_palletizing__subzero_palletizer } from './robotic-palletizing__subzero-palletizer';
import { page_robotic_palletizing__tray_palletizer } from './robotic-palletizing__tray-palletizer';
import { page_terms_of_use } from './terms-of-use';
import { page_tools } from './tools';
import { page_tools__palletizing_roi_calculator } from './tools__palletizing-roi-calculator';

export const PAGES: Page[] = [
  home,
  page_about__careers,
  page_about__compliance,
  page_about,
  page_case_packing__bag_case_packer,
  page_case_packing__carton_case_packer,
  page_case_packing__cup_and_tub_case_packer,
  page_case_packing__drop_packer,
  page_case_packing__flow_wrap_case_packer,
  page_case_packing,
  page_case_packing__integrated_case_packer,
  page_case_packing__pillow_bag_case_packer,
  page_case_packing__pouch_case_packer,
  page_case_packing__robotic_case_packer,
  page_case_packing__thermoformed_package_case_packer,
  page_case_packing__top_load_case_packer,
  page_case_packing__tray_packer,
  page_case_packing__tx__dallas,
  page_contact,
  page_conveyor_systems__accumulation_and_flow_control,
  page_conveyor_systems__ca__fresno,
  page_conveyor_systems__case_conveyor_intralogistics,
  page_conveyor_systems__curves_and_transfers,
  page_conveyor_systems__elevation_conveyors,
  page_conveyor_systems__end_of_line_integration,
  page_conveyor_systems__hygienic_food_conveyor__dry,
  page_conveyor_systems__hygienic_food_conveyor,
  page_conveyor_systems__hygienic_food_conveyor__washdown,
  page_conveyor_systems,
  page_conveyor_systems__merge_divert_and_sorting,
  page_conveyor_systems__straight_conveying,
  page_industries__bakery_and_snacks,
  page_industries__beverage,
  page_industries__chemicals,
  page_industries__co_packers,
  page_industries__confectionery,
  page_industries__consumer_packaged_goods,
  page_industries__dairy_and_cheese,
  page_industries__e_commerce_and_distribution,
  page_industries__food_processing,
  page_industries__frozen_food_and_ice_cream,
  page_industries__household_and_cleaning_products,
  page_industries,
  page_industries__paper_and_packaging,
  page_industries__personal_care_and_cosmetics,
  page_industries__pet_food,
  page_industries__pharmaceutical,
  page_industries__protein_processing,
  page_locations,
  page_parts_and_service,
  page_privacy_choices,
  page_privacy_policy,
  page_resources__blog__how_much_does_a_robotic_palletizer_cost,
  page_resources__blog,
  page_resources__case_studies__avon,
  page_resources__case_studies__custom_foods,
  page_resources__case_studies,
  page_resources__case_studies__lodge_cast_iron,
  page_resources__downloads,
  page_resources__e_books,
  page_resources,
  page_resources__trade_shows_and_events,
  page_resources__trade_shows_and_events__pack_expo_international_2026,
  page_resources__webinars,
  page_resources__white_papers,
  page_robotic_palletizing__bag_palletizer,
  page_robotic_palletizing__box_palletizer,
  page_robotic_palletizing__bucket_palletizer,
  page_robotic_palletizing__bundle_palletizer,
  page_robotic_palletizing__carton_palletizer,
  page_robotic_palletizing__case_palletizer,
  page_robotic_palletizing__cobot_palletizer,
  page_robotic_palletizing__compact_palletizer,
  page_robotic_palletizing__custom_palletizer,
  page_robotic_palletizing__drum_palletizer,
  page_robotic_palletizing__high_speed_palletizer,
  page_robotic_palletizing,
  page_robotic_palletizing__ks__lenexa,
  page_robotic_palletizing__robotic_palletizer_cost,
  page_robotic_palletizing__subzero_palletizer,
  page_robotic_palletizing__tray_palletizer,
  page_terms_of_use,
  page_tools,
  page_tools__palletizing_roi_calculator,
];

export const BY_ROUTE = new Map(PAGES.map((p) => [p.route, p]));
