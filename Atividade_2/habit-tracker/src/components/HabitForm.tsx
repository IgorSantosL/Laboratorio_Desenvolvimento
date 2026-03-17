import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../store/hooks';
import { addHabit, editHabit } from '../store/habitsSlice';
import { Habit } from '../types';

const CATEGORIES = ['Saúde', 'Estudo', 'Lazer', 'Outro'];

interface Props {
  editingHabit?: Habit | null;
  onClose?: () => void;
}

const HabitForm: React.FC<Props> = ({ editingHabit, onClose }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Saúde');
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setCategory(editingHabit.category);
      setOpen(true);
    }
  }, [editingHabit]);

  const handleClose = () => {
    setOpen(false);
    setName('');
    setCategory('Saúde');
    setNameError(false);
    onClose?.();
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }

    if (editingHabit) {
      dispatch(editHabit({ id: editingHabit.id, name: name.trim(), category }));
    } else {
      dispatch(addHabit({ name: name.trim(), category }));
    }

    handleClose();
  };

  return (
    <>
      {!editingHabit && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            minHeight: 50,
            px: 2.5,
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #ec4899 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 55%, #db2777 100%)',
            },
          }}
        >
          Adicionar Hábito
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pb: 1.25 }}>
          <Stack spacing={0.6}>
            <Typography variant="h6" fontWeight={800}>
              {editingHabit ? 'Editar Hábito' : 'Novo Hábito'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {editingHabit
                ? 'Atualize apenas a aparência dos dados, sem mudar a lógica de edição.'
                : 'Preencha as informações para adicionar um novo hábito à sua rotina.'}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2.25} mt={1}>
            <TextField
              label="Nome do hábito *"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              error={nameError}
              helperText={nameError ? 'O nome é obrigatório.' : ' '}
              fullWidth
              autoFocus
              InputProps={{
                sx: {
                  borderRadius: 3.5,
                  bgcolor: 'rgba(255,255,255,0.88)',
                },
              }}
            />
            <TextField
              select
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 3.5,
                  bgcolor: 'rgba(255,255,255,0.88)',
                },
              }}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 0.5 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              minWidth: 110,
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.82),
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              minWidth: 120,
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #ec4899 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #6d28d9 0%, #9333ea 55%, #db2777 100%)',
              },
            }}
          >
            {editingHabit ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HabitForm;