import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Flex } from '@chakra-ui/layout'
import { Button, IconButton } from '@chakra-ui/react'
import { useSteps } from 'chakra-ui-steps'
import rewards from 'assets/rewards.svg'
import risk from 'assets/risk.svg'
import withdraw from 'assets/withdraw.svg'
import { CarouselDots } from 'components/CarouselDots/CarouselDots'
import { SlideTransition } from 'components/SlideTransition'
import { Text } from 'components/Text'

import { DefiModalHeader } from '../DefiModalHeader/DefiModalHeader'

const STEPS_LENGTH = 3
const STEP_TO_ELEMENTS_MAPPING = {
  1: {
    bodies: [
      'defi.learnMore.bodies.rateFluctuationInfo',
      'defi.learnMore.bodies.amountStakingInfo',
      'defi.learnMore.bodies.withdrawInfo'
    ],
    headerImageSrc: rewards
  },
  2: {
    bodies: ['defi.learnMore.bodies.unbondingInfo'],
    headerImageSrc: withdraw
  },
  3: {
    bodies: ['defi.learnMore.bodies.slashingInfo', 'defi.learnMore.bodies.partnerInfo'],
    headerImageSrc: risk
  }
}

type LearnMoreProps = {
  assetId: string
}

export const LearnMore = ({ assetId }: LearnMoreProps) => {
  // TODO: wire me up, parentheses are nice but let's get asset name from selectAssetNameById instead of this
  const asset = (_ => ({
    name: 'Osmo'
  }))(assetId)

  const handleClose = () => 'TODO'

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 1
  })

  const isLastStep = activeStep === STEPS_LENGTH
  const isFirstStep = activeStep === 1

  const handleNextOrCloseClick = () => {
    if (isLastStep) return handleClose()

    nextStep()
  }

  const handlePrevClick = () => {
    if (isFirstStep) {
      // TODO
    }

    prevStep()
  }

  return (
    <SlideTransition key={activeStep}>
      <IconButton
        variant='ghost'
        color='white'
        icon={<ArrowBackIcon />}
        aria-label={'common.back'}
        position='absolute'
        top={2}
        left={3}
        fontSize='xl'
        size='sm'
        onClick={handlePrevClick}
      />
      <Box pt='36px' pb='20px' px='24px'>
        <Flex
          direction='column'
          maxWidth='395px'
          height='520px'
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex direction='column' alignItems='center'>
            <DefiModalHeader
              headerImageSrc={STEP_TO_ELEMENTS_MAPPING[activeStep as 1 | 2 | 3].headerImageSrc}
              headerText={[`defi.learnMore.headers.${activeStep - 1}`, { assetName: asset.name }]}
              headerImageWidth={120}
            />
            <Box>
              <Flex direction='column'>
                {STEP_TO_ELEMENTS_MAPPING[activeStep as 1 | 2 | 3].bodies.map((body, i) => (
                  <Box textAlign='left' key={i} mb='18px'>
                    <Text
                      translation={[body, { assetName: asset.name }]}
                      color='gray.500'
                      fontWeight='semibold'
                      fontSize='15px'
                    />
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Flex width='100%' direction='column' justifyContent='center' alignItems='center'>
            <Box width='100%'>
              <Button
                size='lg'
                zIndex={1}
                width='100%'
                colorScheme='blue'
                mb='20px'
                onClick={handleNextOrCloseClick}
              >
                <Text translation={isLastStep ? 'defi.learnMore.close' : 'defi.learnMore.next'} />
              </Button>
            </Box>
            <Box width='46px'>
              <CarouselDots length={STEPS_LENGTH} activeIndex={activeStep} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </SlideTransition>
  )
}
