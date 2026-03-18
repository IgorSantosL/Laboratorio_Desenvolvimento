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
    <Container
      maxWidth={false}
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1.5, sm: 2.5, md: 3.5 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          p: { xs: 2, sm: 2.5, md: 3.5 },
          borderRadius: 8,
          border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          boxShadow: '0 30px 70px rgba(61, 38, 109, 0.10)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,243,255,0.98) 100%)',
          backdropFilter: 'blur(18px)',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={3}>
          <Box
            sx={{
              px: { xs: 2.25, sm: 3, md: 4 },
              py: { xs: 2.25, sm: 2.75, md: 3.25 },
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

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  xl: 'minmax(0, 1fr) 460px',
                },
                gap: { xs: 2, sm: 2.5, xl: 3 },
                alignItems: 'center',
                width: '100%',
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  minWidth: 0,
                  display: 'grid',
                  gridTemplateColumns: '64px minmax(0, 1fr)',
                  gap: { xs: 1.25, sm: 1.75, md: 2 },
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 4,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(255,255,255,0.16)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    flexShrink: 0,
                  }}
                >
                  <SelfImprovementIcon sx={{ fontSize: 34, color: 'common.white' }} />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.9rem', md: '2.2rem' },
                      lineHeight: 1.08,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                    }}
                  >
                    Controle de Hábitos Diários
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mt: 0.75,
                      color: 'rgba(255,255,255,0.84)',
                      lineHeight: 1.35,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      maxWidth: { xl: 620 },
                    }}
                  >
                    Organize sua rotina, acompanhe seu progresso e mantenha constância.
                  </Typography>
                </Box>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', xl: 400 },
                  minWidth: 0,
                  px: { xs: 2.5, sm: 3, xl: 3.5 },
                  py: { xs: 2, sm: 2.25 },
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'common.white',
                  backdropFilter: 'blur(14px)',
                  overflow: 'hidden',
                  justifySelf: { xs: 'stretch', xl: 'end' },
                  ml: { xl: 2 },
                  boxSizing: 'border-box',
                }}
              >
                <Stack spacing={1} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'rgba(255,255,255,0.78)',
                      lineHeight: 1.1,
                      display: 'block',
                      whiteSpace: 'normal',
                    }}
                  >
                    PROGRESSO DE HOJE
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      lineHeight: 1,
                      fontSize: { xs: '2rem', md: '2.2rem' },
                    }}
                  >
                    {done}/{total}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.82)',
                      lineHeight: 1.35,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      pr: 1,
                    }}
                  >
                    hábitos concluídos hoje
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      mt: 0.5,
                      width: '100%',
                      height: 8,
                      borderRadius: 999,
                      bgcolor: 'rgba(255,255,255,0.18)',
                      overflow: 'hidden',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #ffffff 0%, #f9d7ff 100%)',
                      },
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.76)',
                      lineHeight: 1.25,
                      display: 'block',
                      whiteSpace: 'normal',
                      pr: 1,
                    }}
                  >
                    {progress}% concluído
                  </Typography>
                </Stack>
              </Paper>
            </Box>
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