import React from 'react';
import { alpha } from '@mui/material/styles';
import { Paper, Stack, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useAppSelector, selectFilteredHabits } from '../store/hooks';
import HabitItem from './HabitItem';

const HabitList: React.FC = () => {
  const habits = useAppSelector(selectFilteredHabits);

  if (habits.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          py: 7,
          px: 3,
          textAlign: 'center',
          borderRadius: 6,
          border: (theme) => `1px dashed ${alpha(theme.palette.primary.main, 0.18)}`,
          bgcolor: 'rgba(255,255,255,0.5)',
        }}
      >
        <Stack alignItems="center" justifyContent="center" gap={1.2} color="text.secondary">
          <ChecklistIcon sx={{ fontSize: 52, opacity: 0.45 }} />
          <Typography variant="h6" color="text.primary">
            Nenhum hábito encontrado.
          </Typography>
          <Typography variant="body2">Adicione um hábito para começar!</Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack gap={1.5}>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </Stack>
  );
};

export default HabitList;