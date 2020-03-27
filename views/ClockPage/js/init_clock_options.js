import {dom_beat} from './load_clock';
import {refresh_big_text_size} from '../../BigText';
import THEME_LIST from './THEME_LIST';
import {TabOptions} from '../../TabOptions';

export default init_clock_options;

function init_clock_options() {
  const text_container = document.getElementById('clock-container');

  const tab_options = new TabOptions({
    option_spec_list: get_option_list(),
    preset_list: THEME_LIST,
    text_container,
    options_container: document.getElementById('options-container'),
    on_any_change,
  });

  const get_option_value = tab_options.get_option_value.bind(tab_options);
  const {font_loaded_promise} = tab_options;

  tab_options.generate_dom();

  return {get_option_value, font_loaded_promise};

  function on_any_change({initial_run}) {
    update_options();
    if( !initial_run ){
      dom_beat(true);
      refresh_big_text_size();
    }
  }

  function update_options() {
    text_container.style.color = get_option_value('color_font');
    text_container.style.textShadow = get_option_value('font_shadow');
    {
      const show_seconds = get_option_value('show_seconds');
      document.body['classList'][show_seconds?'remove':'add']('noSeconds');
    }

    {
      const show_pm = get_option_value('show_pm');
      const twelve_hour = get_option_value('12_hour');
      document.body['classList'][show_pm&&twelve_hour?'remove':'add']('noPeriod');
    }
  }
}

function get_option_list() {
  return [
    {
      option_id:'theme',
      option_type: 'preset-input',
      option_description:'theme',
      option_default: 'steel',
    },
    {
      option_id: 'clock_font',
      option_type: 'text-font-input',
      option_description: 'font',
      option_default: 'Josefin Slab',
      option_negative_dependency: 'theme',
    },
    {
      option_id: 'color_font',
      option_type: 'text-color-input',
      option_description: 'font color',
      option_default: '#a70000',
      option_negative_dependency: 'theme',
    },
    {
      option_id: 'font_shadow',
      option_type: 'text-shadow-input',
      option_description: 'font shadow',
      option_default: '',
      option_negative_dependency: 'theme',
      option_placeholder: 'see css text-shadow',
    },
    {
      option_id: 'font_size',
      option_type: 'text-input',
      option_description: 'font size',
      option_default: '580',
    },
    {
      option_id: 'bg_color',
      option_type: 'background-color-input',
      option_description: 'background color',
      option_default: '#ffffff',
      option_negative_dependency: 'theme',
    },
    {
      option_id: 'bg_image',
      option_type: 'background-image-input',
      option_description: 'background image',
      option_default: ''    ,
      option_negative_dependency: 'theme',
      option_placeholder: 'image url',
    },
    {
      option_id: 'color_icon',
      option_type: 'color-input',
      option_description: 'icon color',
      /*
      option_default: '#cc0000',
      option_default: '#007000',
      */
      option_default: '#545454',
    },
    {
      option_id: 'show_seconds_title',
      option_type: 'boolean-input',
      option_description: 'seconds in title',
      option_default: false,
    },
    {
      option_id: 'show_seconds',
      option_type: 'boolean-input',
      option_description: 'seconds',
      option_default: true,
    },
    {
      option_id: '12_hour',
      option_type: 'boolean-input',
      option_description: '12-hour',
      option_default: get_default_12_hour(),
    },
    {
      option_id: 'show_pm',
      option_type: 'boolean-input',
      option_description: 'am/pm',
      option_default: true,
      option_dependency: '12_hour',
    },
    {
      option_id: 'show_date',
      option_type: 'boolean-input',
      option_description: 'date',
      option_default: true,
    },
    {
      option_id: 'show_week',
      option_type: 'boolean-input',
      option_description: 'week',
      option_default: false,
      option_dependency: 'show_date',
    }
  ];
}

function get_default_12_hour() {
  return (
    /(AM)|(PM)/.test(new Date().toLocaleTimeString()) ||
    window.navigator.language==='en-US'
  );
}

