import React from 'react';
import { Teacher, Class, Subject, DAYS, PERIODS, getTimeForPeriod, formatTimeRange } from '../../types';

interface ClassSchedulePrintViewProps {
  classItem: Class;
  schedule: { [day: string]: { [period: string]: { teacher: Teacher; subject?: Subject } | null } };
  teachers: Teacher[];
  subjects: Subject[];
}

const ClassSchedulePrintView: React.FC<ClassSchedulePrintViewProps> = ({
  classItem,
  schedule,
  teachers,
  subjects
}) => {
  // Check if a period is fixed (preparation, lunch, breakfast, or afternoon breakfast)
  const isFixedPeriod = (day: string, period: string): boolean => {
    // For class schedules, we need to check if this is a fixed period based on the period and level
    if (period === 'prep') return true;
    if (classItem.level === 'Ortaokul' && period === 'breakfast') return true;
    if ((classItem.level === 'İlkokul' || classItem.level === 'Anaokulu') && period === '5') return true;
    if (classItem.level === 'Ortaokul' && period === '6') return true;
    if (period === 'afternoon-breakfast') return true;
    return false;
  };

  // Get fixed period display info with correct text
  const getFixedPeriodInfo = (period: string, level?: 'Anaokulu' | 'İlkokul' | 'Ortaokul') => {
    if (period === 'prep') {
      return {
        title: level === 'Ortaokul' ? 'Hazırlık' : 'Kahvaltı',
        subtitle: level === 'Ortaokul' ? '08:30-08:40' : '08:30-08:50',
        color: '#3B82F6',
        bgColor: '#DBEAFE'
      };
    } else if (period === 'breakfast') {
      return {
        title: 'Kahvaltı',
        subtitle: '09:15-09:35',
        color: '#F59E0B',
        bgColor: '#FEF3C7'
      };
    } else if ((level === 'İlkokul' || level === 'Anaokulu') && period === '5') {
      return {
        title: 'Yemek',
        subtitle: '11:50-12:25',
        color: '#10B981',
        bgColor: '#D1FAE5'
      };
    } else if (level === 'Ortaokul' && period === '6') {
      return {
        title: 'Yemek',
        subtitle: '12:30-13:05',
        color: '#10B981',
        bgColor: '#D1FAE5'
      };
    } else if (period === 'afternoon-breakfast') {
      return {
        title: 'İkindi Kahvaltısı',
        subtitle: '14:35-14:45',
        color: '#F59E0B',
        bgColor: '#FEF3C7'
      };
    }

    return null;
  };

  const calculateWeeklyHours = () => {
    let totalHours = 0;
    DAYS.forEach(day => {
      PERIODS.forEach(period => {
        if (schedule[day][period] && !isFixedPeriod(day, period)) {
          totalHours++;
        }
      });
    });
    return totalHours;
  };

  // Get subject for teacher - find the subject that matches teacher's branch
  const getSubjectForTeacher = (teacher: Teacher): Subject | undefined => {
    return subjects.find(subject => 
      subject.branch === teacher.branch && 
      subject.level === teacher.level
    );
  };

  // Zaman bilgisini al
  const getTimeInfo = (period: string) => {
    const timePeriod = getTimeForPeriod(period, classItem.level);
    if (timePeriod) {
      return formatTimeRange(timePeriod.startTime, timePeriod.endTime);
    }
    return `${period}. Ders`;
  };

  // Öğretmen renkleri - daha canlı ve çeşitli
  const getTeacherColor = (teacherId: string) => {
    const colors = [
      { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' }, // Mavi
      { bg: '#D1FAE5', text: '#065F46', border: '#10B981' }, // Yeşil
      { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' }, // Kırmızı
      { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' }, // Sarı
      { bg: '#E0E7FF', text: '#3730A3', border: '#6366F1' }, // İndigo
      { bg: '#FCE7F3', text: '#BE185D', border: '#EC4899' }, // Pembe
      { bg: '#ECFDF5', text: '#047857', border: '#059669' }, // Emerald
      { bg: '#FDF4FF', text: '#7C2D12', border: '#C2410C' }, // Orange
    ];
    
    const hash = teacherId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div style={{ 
      width: '297mm', 
      height: '210mm',
      padding: '8mm',
      fontSize: '11px',
      lineHeight: '1.3',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: 'white',
      color: '#000000',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)'
    }}>
      {/* COLORFUL Header with gradient */}
      <div style={{ 
        marginBottom: '6mm',
        paddingBottom: '4mm',
        borderBottom: '3px solid #279C38',
        background: 'linear-gradient(135deg, #279C38, #006EB7)',
        borderRadius: '8px',
        padding: '12px',
        color: 'white',
        boxShadow: '0 4px 12px rgba(39, 156, 56, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              margin: '0 0 4px 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {classItem.name}
            </h1>
            <p style={{ 
              fontSize: '14px', 
              margin: 0,
              opacity: 0.9
            }}>
              {classItem.level} • {calculateWeeklyHours()} Ders Saati
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>İDE Okulları</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Sınıf Programı</div>
          </div>
        </div>
      </div>

      {/* COLORFUL Schedule Table */}
      <table style={{ 
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr>
            <th style={{ 
              border: '1px solid #E5E7EB',
              padding: '8px 4px',
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #279C38, #34D399)',
              color: 'white',
              width: '70px',
              fontSize: '9px'
            }}>
              SAAT
            </th>
            {DAYS.map((day, index) => (
              <th key={day} style={{ 
                border: '1px solid #E5E7EB',
                padding: '8px 4px',
                textAlign: 'center',
                fontWeight: 'bold',
                background: `linear-gradient(135deg, ${
                  index % 2 === 0 ? '#006EB7' : '#3B82F6'
                }, ${
                  index % 2 === 0 ? '#3B82F6' : '#60A5FA'
                })`,
                color: 'white',
                fontSize: '9px'
              }}>
                {day.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Hazırlık/Kahvaltı Period */}
          <tr>
            <td style={{ 
              border: '1px solid #E5E7EB',
              padding: '6px 4px',
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
              color: 'white',
              fontSize: '8px'
            }}>
              <div style={{ fontWeight: 'bold' }}>
                {classItem.level === 'Ortaokul' ? 'Hazırlık' : 'Kahvaltı'}
              </div>
              <div style={{ fontSize: '7px', opacity: 0.9, marginTop: '2px' }}>
                {classItem.level === 'Ortaokul' ? '08:30-08:40' : '08:30-08:50'}
              </div>
            </td>
            {DAYS.map(day => {
              const fixedInfo = getFixedPeriodInfo('prep', classItem.level);
              
              return (
                <td key={`${day}-prep`} style={{ 
                  border: '1px solid #E5E7EB',
                  padding: '6px 4px',
                  textAlign: 'center',
                  background: fixedInfo?.bgColor || '#DBEAFE',
                  color: fixedInfo?.color || '#1E40AF'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '9px' }}>
                    {fixedInfo?.title || (classItem.level === 'Ortaokul' ? 'Hazırlık' : 'Kahvaltı')}
                  </div>
                </td>
              );
            })}
          </tr>

          {PERIODS.map((period, periodIndex) => {
            const timeInfo = getTimeInfo(period);
            const isLunchPeriod = (
              (classItem.level === 'İlkokul' || classItem.level === 'Anaokulu') && period === '5'
            ) || (
              classItem.level === 'Ortaokul' && period === '6'
            );
            
            // Show breakfast between 1st and 2nd period for middle school
            const showBreakfastAfter = classItem.level === 'Ortaokul' && period === '1';
            
            const showAfternoonBreakAfter = period === '8';
            
            return (
              <React.Fragment key={period}>
                <tr style={{ 
                  backgroundColor: isLunchPeriod ? '#F0FDF4' : (periodIndex % 2 === 0 ? '#FFFFFF' : '#F8FAFC')
                }}>
                  <td style={{ 
                    border: '1px solid #E5E7EB',
                    padding: '6px 4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    background: isLunchPeriod 
                      ? 'linear-gradient(135deg, #10B981, #34D399)' 
                      : `linear-gradient(135deg, #${periodIndex % 2 === 0 ? '8B5CF6' : '6366F1'}, #${periodIndex % 2 === 0 ? 'A78BFA' : '818CF8'})`,
                    color: 'white',
                    fontSize: '8px'
                  }}>
                    <div style={{ fontWeight: 'bold' }}>
                      {isLunchPeriod ? 'Yemek' : `${period}.`}
                    </div>
                    <div style={{ fontSize: '7px', opacity: 0.9, marginTop: '2px' }}>
                      {isLunchPeriod 
                        ? (classItem.level === 'İlkokul' || classItem.level === 'Anaokulu' ? '11:50-12:25' : '12:30-13:05')
                        : timeInfo
                      }
                    </div>
                  </td>
                  {DAYS.map(day => {
                    if (isLunchPeriod) {
                      return (
                        <td key={`${day}-${period}`} style={{ 
                          border: '1px solid #E5E7EB',
                          padding: '6px 4px',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                          color: '#065F46'
                        }}>
                          <div style={{ fontWeight: 'bold', fontSize: '9px' }}>
                            Yemek
                          </div>
                        </td>
                      );
                    }
                    
                    const slot = schedule[day][period];
                    
                    return (
                      <td key={`${day}-${period}`} style={{ 
                        border: '1px solid #E5E7EB',
                        padding: '6px 4px',
                        textAlign: 'center',
                        backgroundColor: periodIndex % 2 === 0 ? '#FFFFFF' : '#F8FAFC'
                      }}>
                        {slot ? (
                          <div style={{
                            background: `linear-gradient(135deg, ${getTeacherColor(slot.teacher.id).bg}, ${getTeacherColor(slot.teacher.id).bg}dd)`,
                            color: getTeacherColor(slot.teacher.id).text,
                            borderRadius: '4px',
                            padding: '4px',
                            border: `2px solid ${getTeacherColor(slot.teacher.id).border}`,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>
                            <div style={{ 
                              fontWeight: 'bold',
                              fontSize: '9px',
                              marginBottom: '2px'
                            }}>
                              {slot.teacher.name.length > 12 
                                ? slot.teacher.name.substring(0, 12) + '...'
                                : slot.teacher.name
                              }
                            </div>
                            <div style={{ 
                              fontSize: '8px',
                              opacity: 0.8
                            }}>
                              {(() => {
                                const subject = getSubjectForTeacher(slot.teacher);
                                const subjectName = subject?.name || slot.teacher.branch;
                                return subjectName.length > 10 
                                  ? subjectName.substring(0, 10) + '...'
                                  : subjectName;
                              })()}
                            </div>
                          </div>
                        ) : (
                          <div style={{ 
                            color: '#9CA3AF', 
                            fontSize: '8px',
                            fontStyle: 'italic'
                          }}>
                            Boş
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* NEW: Breakfast between 1st and 2nd period for middle school */}
                {showBreakfastAfter && (
                  <tr>
                    <td style={{ 
                      border: '1px solid #E5E7EB',
                      padding: '6px 4px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                      color: 'white',
                      fontSize: '8px'
                    }}>
                      <div style={{ fontWeight: 'bold' }}>
                        Kahvaltı
                      </div>
                      <div style={{ fontSize: '7px', opacity: 0.9, marginTop: '2px' }}>
                        09:15-09:35
                      </div>
                    </td>
                    {DAYS.map(day => {
                      const fixedInfo = getFixedPeriodInfo('breakfast', classItem.level);
                      
                      return (
                        <td key={`${day}-breakfast`} style={{ 
                          border: '1px solid #E5E7EB',
                          padding: '6px 4px',
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                          color: '#92400E'
                        }}>
                          <div style={{ fontWeight: 'bold', fontSize: '9px' }}>
                            {fixedInfo?.title || 'Kahvaltı'}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                )}

                {/* İkindi Kahvaltısı 8. ders sonrasında */}
                {showAfternoonBreakAfter && (
                  <tr>
                    <td style={{ 
                      border: '1px solid #E5E7EB',
                      padding: '6px 4px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                      color: 'white',
                      fontSize: '8px'
                    }}>
                      <div style={{ fontWeight: 'bold' }}>
                        İkindi Kahvaltısı
                      </div>
                      <div style={{ fontSize: '7px', opacity: 0.9, marginTop: '2px' }}>
                        14:35-14:45
                      </div>
                    </td>
                    {DAYS.map(day => (
                      <td key={`${day}-afternoon-breakfast`} style={{ 
                        border: '1px solid #E5E7EB',
                        padding: '6px 4px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                        color: '#92400E'
                      }}>
                        <div style={{ fontWeight: 'bold', fontSize: '9px' }}>
                          İkindi Kahvaltısı
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* COLORFUL Footer */}
      <div style={{
        marginTop: '6mm',
        padding: '8px',
        background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
        borderRadius: '6px',
        border: '1px solid #D1D5DB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '9px', color: '#374151' }}>
          <strong>İDE Okulları</strong> • Sınıf Programı Sistemi
        </div>
        <div style={{ fontSize: '8px', color: '#6B7280' }}>
          Oluşturulma: {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>
    </div>
  );
};

export default ClassSchedulePrintView;