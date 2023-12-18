import React, { useState } from 'react';
import { useTodoStore } from '../../providers/TodoProvider';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ITodoItem } from '../../stores/store';
import { CSSObject as ICSSObject } from '@emotion/react';
import theme from '../../theme/MainTheme';

interface IEditableItemText {
  item: ITodoItem;
}

interface ICSS {
  [key: string]: ICSSObject;
}

const getEditTaskInputCss = (item: ITodoItem): ICSS => {
  return {
    '& .MuiOutlinedInput-root': {
      ...(item.done && { color: theme.palette.grey[400], textDecoration: 'line-through' }),
      '& > fieldset': { borderColor: 'rgba(0, 0, 0, 0)' },
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& > fieldset': {
        borderColor: 'none',
      },
    },
  };
};

const EditableItemText = observer(({ item }: IEditableItemText) => {
  const todoStore = useTodoStore();
  const [value, setValue] = useState<string>(item.content);

  const handleEditItemInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  const handleEditItemInputOnBlur = (item: ITodoItem) => {
    todoStore.edit({ ...item, content: value.trim() });
  };

  return (
    <TextField
      fullWidth
      value={value}
      id='edit-task-input'
      variant='outlined'
      size='small'
      onChange={handleEditItemInputOnChange}
      onBlur={() => handleEditItemInputOnBlur(item)}
      sx={getEditTaskInputCss(item)}
    />
  );
});

export default EditableItemText;
