import React from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector, selectFilter } from '../store/hooks';
import { setFilter, clearCompleted } from '../store/habitsSlice';
import { Category } from '../types';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const CATEGORIES: Category[] = ['Todas', 'Saúde', 'Estudo', 'Lazer', 'Outro'];

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const habits = useAppSelector((s) => s.habits.habits);
  const completedCount = habits.filter((h) => h.completed).length;

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      alignItems={{ xs: 'stretch', lg: 'center' }}
      justifyContent="space-between"
      gap={2}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 5,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.2}>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 'fit-content', fontWeight: 700 }}>
            Filtrar por categoria
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {CATEGORIES.map((cat) => {
              const active = currentFilter === cat;

              return (
                <Chip
                  key={cat}
                  clickable
                  label={cat}
                  onClick={() => dispatch(setFilter(cat))}
                  color={active ? 'primary' : 'default'}
                  variant={active ? 'filled' : 'outlined'}
                  sx={{
                    borderRadius: 999,
                    px: 0.5,
                    height: 38,
                    fontWeight: 700,
                    borderColor: active ? 'transparent' : (theme) => alpha(theme.palette.primary.main, 0.16),
                    bgcolor: active ? 'primary.main' : 'rgba(255,255,255,0.86)',
                    color: active ? 'common.white' : 'text.primary',
                    boxShadow: active ? '0 12px 26px rgba(124,58,237,0.24)' : 'none',
                    '&:hover': {
                      bgcolor: active ? 'primary.dark' : (theme) => alpha(theme.palette.primary.main, 0.06),
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Stack>
      </Box>

      <Button
        size="medium"
        color="error"
        variant="outlined"
        startIcon={<DeleteSweepIcon />}
        disabled={completedCount === 0}
        onClick={() => dispatch(clearCompleted())}
        sx={{
          alignSelf: { xs: 'stretch', lg: 'center' },
          minHeight: 44,
          borderRadius: 999,
          borderColor: (theme) => alpha(theme.palette.error.main, 0.22),
          bgcolor: 'rgba(255,255,255,0.78)',
        }}
      >
        Limpar concluídos ({completedCount})
      </Button>
    </Stack>
  );
};

export default FilterBar;