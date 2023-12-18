import React, { useState } from 'react';
import { useTodoStore } from '../../providers/TodoProvider';
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { CSSObject as ICSSObject } from '@emotion/react';

interface ICSS {
  [key: string]: ICSSObject;
}

const css: ICSS = {
  addItemInput: { paddingRight: '70px' },
  addItemButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    height: '40px',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '0px 4px 4px 0px',
  },
};

const TodoForm = observer(() => {
  const todoStore = useTodoStore();
  const [value, setValue] = useState<string>('');

  const handleAddItemInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  const handleAddItemButtonOnClick = () => {
    if (value !== '') todoStore.addTodo(value.trim());
    setValue('');
  };

  return (
    <FormControl fullWidth variant='outlined' size='small'>
      <InputLabel htmlFor='add-item-input'>Add task</InputLabel>
      <OutlinedInput
        id='add-item-input'
        label='Add task'
        value={value}
        sx={css.addItemInput}
        onChange={handleAddItemInputOnChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddItemButtonOnClick();
          }
        }}
        endAdornment={
          <InputAdornment position='end'>
            <Button
              disableElevation
              variant='contained'
              color='primary'
              disabled={value === ''}
              onClick={handleAddItemButtonOnClick}
              sx={css.addItemButton}>
              Add
            </Button>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

export default TodoForm;
