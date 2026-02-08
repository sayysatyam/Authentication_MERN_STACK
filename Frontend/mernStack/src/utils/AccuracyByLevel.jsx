import React, { useEffect } from 'react'
import { useQuizStore } from '../AuthStore/quizStore'
import ProgressLine from './ProgressBar';

const AccuracyByLevel = () => {
    const{fetchStat,easyLevelQuestion,
  mediumLevelQuestion,
  hardLevelQuestion,
  easyLevelCorrectedQuestion,
 mediumLevelCorrectedQuestion,
  hardLevelCorrectedQuestion,}=useQuizStore();
  useEffect(() => {
     fetchStat();
  }, []);
  const easyAccuracy = easyLevelQuestion >0 && easyLevelCorrectedQuestion>0 ?Math.floor((easyLevelCorrectedQuestion/easyLevelQuestion)*100):0;
  const mediumAccuracy =mediumLevelQuestion >0 && mediumLevelCorrectedQuestion>0 ?Math.floor((mediumLevelCorrectedQuestion/mediumLevelQuestion)*100):0;
   const hardAccuracy = hardLevelQuestion>0 && hardLevelCorrectedQuestion>0 ?Math.floor((hardLevelCorrectedQuestion/hardLevelQuestion)*100) : 0;
  return (
    <div className='space-y-20 '>
      <div className="grid grid-cols-[80px_1fr_50px] items-center  gap-4">
        <div className="text-xl font-semibold">Easy</div>

            <ProgressLine value={easyAccuracy} />

         <div className="text-sm font-semibold text-right">
          {easyAccuracy} %
  </div>
</div>
      <div className="grid grid-cols-[80px_1fr_50px] items-center gap-4">
        <div className='text-xl font-medium'>Medium</div>
        <ProgressLine value={mediumAccuracy}/>
        <div className="text-sm font-semibold text-right">{mediumAccuracy} % </div>
        </div>
      <div className="grid grid-cols-[80px_1fr_50px] items-center gap-4">
        <div className="text-xl font-semibold ">Hard</div>
       <ProgressLine value={hardAccuracy}/>
        <div className="text-sm font-semibold text-right">{hardAccuracy} %</div>
      </div>
      
    </div>
  )
}

export default AccuracyByLevel
