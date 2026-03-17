import React from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import FilterBar from './components/FilterBar';
import { useAppSelector } from './store/hooks';

const App: React.FC = () => {
  const total = useAppSelector((s) => s.habits.habits.length);
  const done = useAppSelector((s) => s.habits.habits.filter((h) => h.completed).length);
  const progress = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.25, sm: 3, md: 4 },
          borderRadius: 8,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          boxShadow: '0 30px 70px rgba(61, 38, 109, 0.10)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,243,255,0.98) 100%)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              p: { xs: 2.5, md: 3 },
              borderRadius: 6,
              background:
                'linear-gradient(135deg, rgba(124,58,237,0.95) 0%, rgba(168,85,247,0.92) 52%, rgba(236,72,153,0.88) 100%)',
              color: 'common.white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -48,
                right: -26,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -58,
                left: -24,
                width: 132,
                height: 132,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.10)',
              }}
            />

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              gap={3}
              sx={{ position: 'relative', zIndex: 1 }}
            >
              <Stack direction="row" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: 4,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <SelfImprovementIcon sx={{ fontSize: 36, color: 'common.white' }} />
                </Box>
                <Stack spacing={0.5}>
                  <Typography variant="h4" sx={{ fontSize: { xs: '1.7rem', sm: '2.1rem' } }}>
                    Controle de Hábitos Diários
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.84)' }}>
                    Organize sua rotina, acompanhe seu progresso e mantenha constância.
                  </Typography>
                </Stack>
              </Stack>

              <Paper
                elevation={0}
                sx={{
                  minWidth: { xs: '100%', md: 240 },
                  p: 2,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'common.white',
                  backdropFilter: 'blur(14px)',
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.75)' }}>
                    Progresso de hoje
                  </Typography>
                  <Typography variant="h5">
                    {done}/{total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.78)' }}>
                    hábitos concluídos hoje
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      borderRadius: 999,
                      bgcolor: 'rgba(255,255,255,0.18)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #ffffff 0%, #f9d7ff 100%)',
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                    {progress}% concluído
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'stretch', lg: 'center' }}
            gap={2}
          >
            <Box>
              <Typography variant="h6" mb={0.5}>
                Seus hábitos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Adicione, filtre, edite e conclua hábitos sem alterar a lógica do sistema.
              </Typography>
            </Box>
            <HabitForm />
          </Stack>

          <Divider sx={{ borderColor: (theme) => alpha(theme.palette.primary.main, 0.1) }} />

          <FilterBar />

          <HabitList />
        </Stack>
      </Paper>
    </Container>
  );
};

export default App;