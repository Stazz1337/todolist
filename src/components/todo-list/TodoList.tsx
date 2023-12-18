import React, { useEffect, useState } from 'react';
import { useTodoStore } from '../../providers/TodoProvider';
import { Grid, Select, TextField, MenuItem, SelectChangeEvent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ITodoItem } from '../../stores/store';
import { CSSObject as ICSSObject } from '@emotion/react';
import List from './List';
import AddTodoItem from '../add-todo-item/AddTodoItem';
import theme from '../../theme/MainTheme';

interface ICSS {
  [key: string]: ICSSObject;
}

const css: ICSS = {
  searchWrap: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  chipWrap: { mb: 1.8 },
  chip: { mr: 1 },
  inputWrap: { mb: 0.8 },
};

const TodoList = observer(() => {
  const todoStore = useTodoStore();
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const [dateSortOrder, setDateSortOrder] = useState<string>('asc');

  const handleSortOrderChange = (e: SelectChangeEvent<string>) => {
    setSortOrder(e.target.value);
  };

  const handleDateSortOrderChange = (e: SelectChangeEvent<string>) => {
    setDateSortOrder(e.target.value);
  };

  useEffect(() => {
    let sortedTodoList = [...todoStore?.todoList];

    if (sortOrder === 'asc') {
      sortedTodoList.sort((a, b) => a.content.localeCompare(b.content));
    } else {
      sortedTodoList.sort((a, b) => b.content.localeCompare(a.content));
    }

    if (dateSortOrder === 'asc') {
      sortedTodoList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      sortedTodoList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    setTodoList(sortedTodoList);
  }, [todoStore?.todoList, searchValue, sortOrder, dateSortOrder]);

  useEffect(() => {
    let sortedTodoList = [...todoStore?.todoList];

    if (sortOrder === 'asc') {
      sortedTodoList.sort((a, b) => a.content.localeCompare(b.content));
    } else {
      sortedTodoList.sort((a, b) => b.content.localeCompare(a.content));
    }

    setTodoList(sortedTodoList);
  }, [todoStore?.todoList, searchValue, sortOrder]);

  useEffect(() => {
    const serarchValueTrimed = searchValue.trim();
    if (serarchValueTrimed !== '') {
      setTodoList(
        todoStore?.todoList?.filter((item: ITodoItem) =>
          item?.content?.toLocaleLowerCase().includes(serarchValueTrimed.toLocaleLowerCase()),
        ),
      );
    } else {
      setTodoList(todoStore?.todoList);
    }
  }, [todoStore?.todoList, searchValue]);

  const handleSearchItemInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  const handleSetTodoList = (newTodoList: (prevItems: ITodoItem[]) => ITodoItem[]) => {
    setTodoList(newTodoList);
  };

  return (
    <>
      <AddTodoItem />

      <Grid container justifyContent='space-between' alignItems='flex-end' sx={css.searchWrap}>
        <Grid item sx={css.inputWrap}>
          <TextField
            value={searchValue}
            margin='normal'
            label='Search'
            id='search-item-input'
            variant='standard'
            onChange={handleSearchItemInputOnChange}
          />
        </Grid>
        <Grid item sx={css.inputWrap}>
          <Select value={dateSortOrder} onChange={handleDateSortOrderChange} sx={{ width: 140 }}>
            <MenuItem value={'asc'}>Newest</MenuItem>
            <MenuItem value={'desc'}>Oldest</MenuItem>
          </Select>
          <Select value={sortOrder} onChange={handleSortOrderChange} sx={{ width: 140 }}>
            <MenuItem value={'asc'}>Ascending</MenuItem>
            <MenuItem value={'desc'}>Descending</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <List todoList={todoList} handleSetTodoList={handleSetTodoList} />
    </>
  );
});

export default TodoList;
