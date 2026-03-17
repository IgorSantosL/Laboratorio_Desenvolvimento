import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Habit } from '../types';
import { useAppDispatch } from '../store/hooks';
import { deleteHabit, toggleCompleted } from '../store/habitsSlice';
import HabitForm from './HabitForm';

const CATEGORY_COLORS: Record<string, 'success' | 'primary' | 'secondary' | 'default'> = {
  Saúde: 'success',
  Estudo: 'primary',
  Lazer: 'secondary',
  Outro: 'default',
};

const CATEGORY_ACCENTS: Record<string, string> = {
  Saúde: '#10b981',
  Estudo: '#7c3aed',
  Lazer: '#ec4899',
  Outro: '#94a3b8',
};

interface Props {
  habit: Habit;
}

const HabitItem: React.FC<Props> = ({ habit }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const accent = CATEGORY_ACCENTS[habit.category] ?? '#94a3b8';

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          opacity: habit.completed ? 0.76 : 1,
          transition: 'all 0.22s ease',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          borderLeft: `6px solid ${habit.completed ? '#10b981' : accent}`,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 40px rgba(61, 38, 109, 0.10)',
          },
        }}
      >
        <CardContent sx={{ p: { xs: 1.3, sm: 1.8 }, '&:last-child': { pb: { xs: 1.3, sm: 1.8 } } }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" gap={1.5}>
            <Stack direction="row" alignItems="center" gap={1.2} minWidth={0}>
              <Tooltip title={habit.completed ? 'Desmarcar' : 'Marcar como concluído'}>
                <Checkbox
                  checked={habit.completed}
                  onChange={() => dispatch(toggleCompleted(habit.id))}
                  color="success"
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: 28,
                    },
                  }}
                />
              </Tooltip>

              <Box minWidth={0}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    textDecoration: habit.completed ? 'line-through' : 'none',
                    color: habit.completed ? 'text.secondary' : 'text.primary',
                    wordBreak: 'break-word',
                  }}
                >
                  {habit.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {habit.completed ? 'Concluído hoje' : 'Pendente para hoje'}
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1} flexWrap="wrap">
              <Chip
                label={habit.category}
                size="small"
                color={CATEGORY_COLORS[habit.category] ?? 'default'}
                sx={{
                  borderRadius: 999,
                  fontWeight: 700,
                  px: 0.6,
                  height: 32,
                }}
              />
              <Stack direction="row" alignItems="center" gap={0.5}>
                <Tooltip title="Editar">
                  <IconButton
                    size="small"
                    onClick={() => setEditing(true)}
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => dispatch(deleteHabit(habit.id))}
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {editing && <HabitForm editingHabit={habit} onClose={() => setEditing(false)} />}
    </>
  );
};

export default HabitItem;