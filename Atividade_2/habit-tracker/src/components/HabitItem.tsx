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
          width: 'calc(95% - 32px)',
          maxWidth: 'calc(95% - 32px)',
          mx: '45px',
          boxSizing: 'border-box',
          opacity: habit.completed ? 0.76 : 1,
          transition: 'all 0.22s ease',
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          borderLeft: `6px solid ${habit.completed ? '#10b981' : accent}`,
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 20px 40px rgba(61, 38, 109, 0.10)',
          },
        }}
      >
        <CardContent
          sx={{
            pl: { xs: 2.5, sm: 2.75, md: 3 },
            pr: { xs: 2, sm: 2.25, md: 2.5 },
            py: { xs: 1.2, sm: 1.35 },
            boxSizing: 'border-box',
            '&:last-child': {
              pb: { xs: 1.2, sm: 1.35 },
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              alignItems: 'center',
              gap: 1.25,
              width: '100%',
              minWidth: 0,
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                minWidth: 0,
                display: 'grid',
                gridTemplateColumns: '40px minmax(0, 1fr)',
                gap: 1.75,
                alignItems: 'center',
              }}
            >
              <Tooltip title={habit.completed ? 'Desmarcar' : 'Marcar como concluído'}>
                <Checkbox
                  checked={habit.completed}
                  onChange={() => dispatch(toggleCompleted(habit.id))}
                  color="success"
                  sx={{
                    p: 0,
                    width: 28,
                    height: 28,
                    '& .MuiSvgIcon-root': {
                      fontSize: 28,
                    },
                  }}
                />
              </Tooltip>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    textDecoration: habit.completed ? 'line-through' : 'none',
                    color: habit.completed ? 'text.secondary' : 'text.primary',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    lineHeight: 1.2,
                    pr: 1,
                  }}
                >
                  {habit.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    mt: 0.35,
                    lineHeight: 1.2,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                  }}
                >
                  {habit.completed ? 'Concluído hoje' : 'Pendente para hoje'}
                </Typography>
              </Box>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={1}
              flexWrap="nowrap"
              sx={{
                minWidth: 'fit-content',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <Chip
                label={habit.category}
                size="small"
                color={CATEGORY_COLORS[habit.category] ?? 'default'}
                sx={{
                  borderRadius: 999,
                  fontWeight: 700,
                  px: 0.75,
                  height: 32,
                }}
              />

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
          </Box>
        </CardContent>
      </Card>

      {editing && <HabitForm editingHabit={habit} onClose={() => setEditing(false)} />}
    </>
  );
};

export default HabitItem;