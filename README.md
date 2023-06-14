start app: 
    tsc
    node dist/index.ts

create migrations: npm run db:migrate   

Queries for filling tables through sql:

    INSERT INTO Users3 (user_id, first_visit, from_source)
    SELECT DISTINCT em2.user_id, MIN(em2.create_time), JSON_VALUE(CONCAT('[', GROUP_CONCAT(em.data SEPARATOR ','), ']'), '$[0].source') as source
    FROM EventsMock AS em2
    JOIN EventsMock AS em ON em.user_id = em2.user_id AND em.create_time = em2.create_time AND em.event_type = 0
    WHERE em2.event_type = 0
    GROUP BY em2.user_id;

    INSERT INTO AdClickData (event_id, created_at, user_id, source)
    SELECT event_type, create_time, user_id, JSON_VALUE(data, '$.source')
    FROM EventsMock 
    WHERE event_type = 0 OR event_type = 2;

    INSERT INTO PaymentData (user_id, create_at, transaction_id, currency, price)
    SELECT user_id, create_time, JSON_VALUE(data, '$.transaction_id'), JSON_VALUE(data, '$.currency'), JSON_VALUE(data, '$.price') 
    FROM EventsMock 
    WHERE event_type = 1;
    
BUT you can just restore from dump: https://drive.google.com/file/d/1g3O4_TLatAmTnDNe5axoZtYL23ETJSTZ/view?usp=sharing

Endpoint for calling: http://localhost:3000/?startDate=2018-01-19&endDate=2039-02-26&page=2