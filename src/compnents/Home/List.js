import React, { useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 0
  },
  li: {
    border: '1px solid grey'
  }
}));

const TodoList = ({ theme, todos, completeTodo, editTodo, deleteTodo, saveTodo, noteRef, preventSubmit }) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  let UniqKey = 123;

  useEffect(() => {
    let newChecked = [...checked];
    let index = todos.findIndex(x => x.text ==="First item");
    newChecked.push(todos[0])
    setChecked(newChecked);
    completeTodo(index)
  }, [])

  const handleToggle = (value, inx) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    completeTodo(inx);
  };


  return (
    <ThemeProvider theme={theme}>
      <List className={classes.root}>
        {todos.map((todo, inx) => {
          const labelId = `list-todo-${todo}`;

          return (
            <ListItem
              key={`todo-${UniqKey++}`}
              role={undefined}
              dense
              button
              className={classes.li}
            >
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  edge="start"
                  checked={checked.indexOf(todo) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={handleToggle(todo, inx)}
                  onKeyPress={preventSubmit}
                />
              </ListItemIcon>
              {
                (!todo.isEditing) ?
                  <>
                    <ListItemText
                      id={labelId}
                      primary={`${todo.text}`}
                      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
                    />
                    <ListItemIcon>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => editTodo(inx)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemIcon>
                  </>
                  :
                  <>
                    <label
                      htmlFor="task" 
                      className="visuallyhidden"
                    >
                      {todo.text}
                    </label>
                    <input
                      className="form__edit-input"
                      defaultValue={todo.text}
                      ref={(element) => noteRef.current[inx] = element}
                      onKeyPress={preventSubmit}
                      id="task"
                    />
                    <ListItemIcon>
                      <IconButton onClick={() => saveTodo(inx)} edge="end" aria-label="delete" >
                        <BookmarkIcon />
                      </IconButton>
                    </ListItemIcon>
                  </>
              }
              <ListItemSecondaryAction>
                <IconButton onClick={() => deleteTodo(inx)} edge="end" aria-label="delete" color='secondary'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </ThemeProvider>
  );
}

export default TodoList;
