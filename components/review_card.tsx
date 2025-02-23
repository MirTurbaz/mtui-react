import * as React from 'react';
import { DateHelper } from '../helpers/DateHelper';
import { Button } from './common/button';
import Avatar from './icons/avatar';
import ChevronRight from './icons/chevron_right';

export interface ReviewData {
  id: number;
  arrival: string;
  departure: string;
  updated_at: string;
  total_score: number;
  quality: string;
  defect: string;
  name: string;
  pictures: { url: string }[];
}

export const ReviewCard: React.FC<{ review: ReviewData }> = ({ review }) => {
  return (
    <div className={'review_card'}>
      <div className={'review_card__header'}>
        <div className={'typography-light-2'}>{DateHelper.reviewDate(review.updated_at)}</div>
        <div className={'review_card__rating'}>
          <span className={'typography-bold-2'}>{review.total_score}</span>
          <span className={'review_card__rating-small'}> / 10</span>
        </div>
      </div>
      <div className={'review_card__person margin-top-12'}>
        <div className={'review_card__person-avatar'}>
          <Avatar size={40} />
        </div>
        <div className={'review_card__person-name'}>
          <div className={'typography-regular'}>{review.name}</div>
          <div className={'typography-light'}>
            Бронирование: {DateHelper.dateRangeWithYear(review.arrival, review.departure)}
          </div>
        </div>
      </div>
      {review.pictures?.length > 0 && (
        <div className={'review_card__photos margin-top-16'}>
          {review.pictures.slice(0, 2).map((pic, index) => (
            <img src={pic.url} className={'review_card__photo'} key={index} />
          ))}
          {review.pictures.length > 2 && (
            <div className={'review_card__more_photo'}> + {review.pictures.length - 2}</div>
          )}
        </div>
      )}
      <div className={'typography-regular margin-top-12 review_card__content'}>{review.quality}</div>
      <Button size={'inline'} style={{ fontSize: 14 }} href={`/reviews#review-card-${review.id}`}>
        Прочитать и ответить <ChevronRight />
      </Button>
    </div>
  );
};
