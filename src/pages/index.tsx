import type { NextPage } from 'next';

import { CalculatorBox } from '../components/CalculatorBox';
import styles from '../styles/Home.module.css';
import { CalculatorBoxProvider } from '../contexts/CalculatorBoxContext.tsx';

const Home: NextPage = () => {
  return (
    <div className={styles.content}>
      <CalculatorBoxProvider>
        <CalculatorBox/>
      </CalculatorBoxProvider>
    </div>
  )
}

export default Home
