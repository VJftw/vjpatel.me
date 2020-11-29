import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import { SITE_TITLE } from '../lib/constants'
import Course from '../components/academic'

export default function Academic() {
  return (
    <>
      <Layout>
        <Head>
          <title>Academic | {SITE_TITLE}</title>
        </Head>
        <Container>
          <div className="flex flex-col">
            <Course 
              yearRange="2016/17"
              title="MSc Computing and Security"
              institution="King's College London"
              institutionUrl="https://www.kcl.ac.uk/"
              grade="Pass with Distinction"
              achievements={[
                'Dissertation titled "Collective Privacy Management in Social Media"',
                'Awarded the prize for the best overall performance on the MSc in Computing and Security.',
              ]}
              cScore="C-score: 73%. Security Engineering (92%), Group Project - Chit Chat (85%), Cryptography and Information Security (80%), MSc Individual Project - Collective Privacy Management in Social Media (74%), Network Security (69%)"
            ></Course>
            <Course 
              yearRange="2012/16"
              title="BSc Computer Science with Industrial Experience"
              institution="Queen Mary, University of London"
              institutionUrl="https://www.qmul.ac.uk/"
              grade="First Class Honours"
              achievements={[
                'Dissertation titled "Implementations of Homomorphic Encryption"',
              ]}
              cScore="C-score: 75%. Embedded Systems (83%), Computability (82%), Project - Implementations of Homomorphic Encryption (82%), Web Programming (80%), Algorithms and Complexity (73%)"
            ></Course>
          </div>
        </Container>
      </Layout>
    </>
  )
}
