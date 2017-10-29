import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';


import ToggledText from '../components/toggled-text'


storiesOf('ToggledText', module).add('Unmarked', ()=><ToggledText text="MTC"/>)
storiesOf('ToggledText', module).add('Marked', ()=><ToggledText text="MTC" strike={true}/>)
